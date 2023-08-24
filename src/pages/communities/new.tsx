import { api } from "@/utils/api";
import { countries, techFocusAreas } from "@/utils/constants";
import { useUser } from "@clerk/nextjs";
import { ActionIcon, Button, FileInput, LoadingOverlay, MultiSelect, Select, Stepper, TextInput, Textarea } from "@mantine/core";
import { useUploadFile } from "react-firebase-hooks/storage";
import { useForm, zodResolver } from "@mantine/form";
import React, { useState } from "react";
import { GrLinkNext } from "react-icons/gr";
import { z } from "zod";
import { storageBucket } from "@/utils/firestoreConfig";
import { ref } from "firebase/storage";
import { showNotification } from "@mantine/notifications";
import Link from "next/link";
import Container from "@/components/custom-components/container";

export default function NewCommunityPage() {
  const createNewCommunity = api.communities.createNewCommunity.useMutation();
  const { user } = useUser();
  const getMemberInfo = api.members.getMemberInfo.useQuery({ memberId: user?.id ?? "" });
  const [uploadFile, uploading, , error] = useUploadFile();
  const [active, setActive] = useState(0);
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const nextStep = () => setActive((current) => (current < 1 ? current + 1 : current));

  const form = useForm<{
    communityName: string;
    description: string;
    country: string;
    location: string;
    focusArea: string;
    technologies?: string[];
  }>({
    validateInputOnBlur: true,
    validate: zodResolver(
      z.object({
        communityName: z.string().nonempty("Required").min(3, "Name is too short"),
        description: z.string().nonempty("Required").min(8, "Short Description"),
        country: z.string().nonempty("Select a country"),
        location: z.string().nonempty("Provide a location"),
        focusArea: z.string().nonempty("Select a focus area"),
      })
    ),
  });

  async function handleLogoUpload() {
    if (profileImage) {
      await uploadFile(ref(storageBucket, form.values.communityName.split(" ").join("")), profileImage);
    }
    if (error) {
      showNotification({
        message: "There was an error during image upload",
      });
      console.log(error);
    }
  }

  async function handleNewCommunity(values: typeof form.values) {
    if (user) {
      await createNewCommunity
        .mutateAsync({
          creatorId: user.id,
          communityName: values.communityName,
          communityDescription: values.description,
          country: values.country,
          location: values.location,
          focusArea: values.focusArea,
          technologies: technologies,
          logo_url: form.values.communityName.split(" ").join(""),
        })
        .then((onfulfilledValue) => {
          if (onfulfilledValue.country) {
            showNotification({
              message: "Created",
            });
          } else {
            showNotification({
              message: "Error While creating",
            });
          }
        });
    }
  }

  if (!getMemberInfo.isLoading && !(getMemberInfo.data?.name ?? getMemberInfo.data?.email)) {
    return (
      <div className=" flex h-full w-full flex-col  items-center justify-center space-y-4 py-10">
        <p>Incomplete profile !! Complete a base profile to add a community</p>
        <Link href="profile">
          <Button>Complete Profile</Button>
        </Link>
      </div>
    );
  }

  return (
    <Container>
      <form onSubmit={form.onSubmit((values) => void handleNewCommunity(values))} className="flex animate-slideInDown flex-col gap-2 ">
        <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false} breakpoint="xl" className=" mx-auto my-auto mt-10 w-full p-4 shadow-xl sm:w-[60vw]">
          <Stepper.Step label="First step" description="General Info" className="">
            <TextInput label="Community Name" withAsterisk required {...form.getInputProps("communityName")} />
            <Textarea label="description" withAsterisk required {...form.getInputProps("description")} />
            <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-2">
              <Select label="Country" data={countries} withAsterisk required searchable {...form.getInputProps("country")} />
              <TextInput label="Location" withAsterisk required {...form.getInputProps("location")} />
            </div>
            <Select searchable data={[...techFocusAreas, "others"]} {...form.getInputProps("focusArea")} label="Major focus area" withAsterisk placeholder="Select your major focus Area" />
            <MultiSelect
              label="Related Technologies"
              data={technologies}
              placeholder="Add new ones if not included"
              searchable
              creatable
              getCreateLabel={(query) => `+ Add ${query}`}
              onCreate={(query) => {
                const item = { value: query, label: query };
                setTechnologies((current) => [...current, item.value]);
                return item;
              }}
            />
            <div className="m-2 flex justify-end ">
              <ActionIcon onClick={nextStep} type="button" size="lg" bg="teksade" disabled={form.isTouched() && !form.isValid()}>
                <GrLinkNext />
              </ActionIcon>
            </div>
          </Stepper.Step>

          <Stepper.Step label="Second step" description="Image upload">
            <div className="flex flex-col gap-3 ">
              <LoadingOverlay visible={createNewCommunity.isLoading || uploading} />
              <FileInput value={profileImage} onChange={setProfileImage} label="Logo/Profile Image" withAsterisk size="lg" />
              <Button type="submit" onClick={() => void handleLogoUpload()}>
                Add Community
              </Button>
            </div>
          </Stepper.Step>
          <Stepper.Completed>Congratulations Your Community has been created</Stepper.Completed>
        </Stepper>
      </form>
    </Container>
  );
}
