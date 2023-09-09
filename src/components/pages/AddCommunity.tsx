/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { api } from "@/utils/api";
import { countries, techFocusAreas } from "@/utils/constants";
import { useUser } from "@clerk/nextjs";
import { Button, FileInput, LoadingOverlay, MultiSelect, Select, Stepper, TextInput, Textarea } from "@mantine/core";
import { useUploadFile } from "react-firebase-hooks/storage";
import { useForm, zodResolver } from "@mantine/form";
import React, { useState } from "react";
import { string, z } from "zod";
import { storageBucket } from "@/utils/firestoreConfig";
import { ref } from "firebase/storage";
import Link from "next/link";
import Container from "@/components/custom-components/container";
import { useMantineColorScheme } from "@mantine/core";
import useMantineNotify from "@hooks/useNotify";
import { useRouter } from "next/router";
import CustomButton from "@/components/custom-components/button";
import { FaUpload } from "react-icons/fa";
import { technologies as techList } from "@/utils/constants";
import SectionTitle from "../custom-components/sectionTitle";

export default function NewCommunityPage() {
  const createNewCommunity = api.communities.createNewCommunity.useMutation();
  const { user } = useUser();
  const getMemberInfo = api.members.getMemberInfo.useQuery({ memberId: user?.id ?? "" });
  const [uploadFile, uploading, , error] = useUploadFile();
  const [hasInteracted, setHasInteracted] = useState(false);
  const [active, setActive] = useState(0);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const { notifyError, notifySuccess } = useMantineNotify();
  const router = useRouter();

  const nextStep = () => setActive((current) => (current < 2 ? current + 1 : current));

  const form = useForm<{
    communityName: string;
    description: string;
    country: string;
    location: string;
    focusArea: string;
    technologies?: string[];
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
    whatsapp?: string;
    phone?: string;
  }>({
    validateInputOnBlur: true,
    validate: zodResolver(
      z.object({
        communityName: z.string().nonempty("Required").min(3, "Name is too short"),
        description: z.string().nonempty("Required").min(8, "Short Description"),
        country: z.string().nonempty("Select a country"),
        location: z.string().nonempty("Provide a location"),
        focusArea: z.string().nonempty("Select a focus area"),
        whatsapp: z.string().url().optional(),
        github: z.string().url().optional(),
        twitter: z.string().url().optional(),
        linkedin: z.string().url().optional(),
        website: z.string().url().optional(),
        phone: z.union([z.literal(""), z.string().min(10).optional()]),
      })
    ),
  });

  function handleImageChange(profileImage: File | null) {
    setHasInteracted(true); // Add this line
    setProfileImage(profileImage);
  }

  async function handleLogoUpload() {
    if (profileImage) {
      await uploadFile(ref(storageBucket, `logos/${form.values.communityName.split(" ").join("")}`), profileImage);
    }
    if (error) {
      notifyError({
        message: "Oops! We couldn't upload your image. Please try again.",
      });
    }
  }

  async function handleNewCommunity(values: typeof form.values) {
    if (user) {
      try {
        const onfulfilledValue = await createNewCommunity
          .mutateAsync({
            creatorId: user.id,
            communityName: values.communityName,
            communityDescription: values.description,
            country: values.country,
            location: values.location,
            focusArea: values.focusArea,
            technologies: values.technologies,
            logo_url: form.values.communityName.split(" ").join(""),
            github: values.github,
            twitter: values.twitter,
            linkedin: values.linkedin,
            website: values.website,
            whatsapp: values.whatsapp,
            phone: values.phone?.length ? values.phone : undefined,
          })
          .then((onfulfilledValue) => {
            if (onfulfilledValue?.country) {
              notifySuccess({
                title: "Success",
                message: "Community successfully set up!",
              });
              void router.push(`/communities/${onfulfilledValue.id}`);
            } else {
              notifyError({
                message: "Hang tight! We faced a glitch while creating your community.",
              });
            }
          });
      } catch (error) {
        notifyError({
          message: "An error occurred while creating the community.",
        });
      }
    }
  }

  // function to check if user has uploaded the right image format
  function checkImageType() {
    if (!profileImage) return false;

    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.svg)$/i;

    if (allowedExtensions.exec(profileImage.name)) {
      return true;
    }

    return false;
  }

  if (!getMemberInfo.isLoading && !(getMemberInfo.data?.name ?? getMemberInfo.data?.email)) {
    return (
      <div className=" flex w-full flex-col items-center justify-center space-y-4 py-10 text-center">
        <div className={`mb-4 flex items-center rounded-lg p-4 text-sm ${dark ? "border-blue-800 bg-gray-800 text-blue-400" : "border-blue-300 bg-blue-50 text-blue-800"}`} role="alert">
          <svg className="mr-3 inline h-10 w-10 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="text-base">Let&apos;s get to know you better! Complete your basic profile before adding a community.</span>
          </div>
        </div>
        <Link href="/profile">
          <Button className="rounded-full text-base">Complete Profile</Button>
        </Link>
      </div>
    );
  }

  return (
    <Container>
      <SectionTitle
        heading="Enrich Teksade, Add Your Community!"
        description="By introducing your community, you're amplifying its voice and expanding its horizons. Let's make Teksade richer together!"
      />
      <form onSubmit={form.onSubmit((values) => void handleNewCommunity(values))} className="flex animate-slideInDown flex-col gap-2">
        <Stepper active={active} onStepClick={setActive} allowNextStepsSelect={false} breakpoint="xl" className=" mx-auto my-auto mt-10 w-full p-4 sm:w-[60vw]" id="stepper">
          <Stepper.Step label="Step 1" description="General Info" className="" id="step-1">
            <TextInput label="Community Name" withAsterisk required {...form.getInputProps("communityName")} size="md" className="mb-4" />
            <Textarea label="Description" withAsterisk required {...form.getInputProps("description")} className="mb-4" />
            <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-2">
              <Select label="Country" data={countries} withAsterisk required searchable {...form.getInputProps("country")} size="md" className="mb-4" />
              <TextInput label="Location" withAsterisk required {...form.getInputProps("location")} size="md" className="mb-4" />
            </div>
            <Select
              searchable
              data={[...techFocusAreas, "Others"]}
              {...form.getInputProps("focusArea")}
              className="mb-4"
              label="Major focus area"
              size="md"
              withAsterisk
              placeholder="Select your major focus Area"
            />
            <MultiSelect label="Related Technologies" data={techList} placeholder="Pick your technologies" searchable clearable {...form.getInputProps("technologies")} size="md" />
            <div className="my-4 flex justify-end ">
              <CustomButton
                size="md"
                variant="filled"
                title="Next"
                onClickHandler={() => {
                  nextStep();
                  //Having an issue where this field takes the values of the community name , this is a temporary fix
                  form.setFieldValue("phone", "");
                }}
                disabled={!form.isTouched() || !form.isValid()}
              />
            </div>
          </Stepper.Step>
          <Stepper.Step label="Step 2" description="Social Info" className="" id="step-2">
            <TextInput label="Contact Number" {...form.getInputProps("phone")} size="md" className="mb-4" />
            <TextInput label="Github Url" {...form.getInputProps("github")} size="md" className="mb-4" />
            <TextInput label="Twitter Url" {...form.getInputProps("twitter")} size="md" className="mb-4" />
            <TextInput label="Web Url" {...form.getInputProps("website")} size="md" className="mb-4" />
            <TextInput label="Linkedin Url" {...form.getInputProps("linkedin")} size="md" className="mb-4" />
            <TextInput label="Whatsapp group link" {...form.getInputProps("whatsapp")} size="md" className="mb-4" />
            <div className="my-4 flex justify-between ">
              <CustomButton size="md" variant="filled" title="Prev" onClickHandler={() => setActive(0)} />
              <CustomButton size="md" variant="filled" title="Next" onClickHandler={nextStep} />
            </div>
          </Stepper.Step>

          <Stepper.Step label="Step 2" description="Image upload">
            <div className="flex flex-col gap-4 pt-4">
              <LoadingOverlay visible={createNewCommunity.isLoading || uploading} />
              <FileInput
                placeholder="Got a perfect community snapshot? Share it here!"
                value={profileImage}
                onChange={handleImageChange}
                error={hasInteracted && !checkImageType() ? "Please upload a valid image." : null}
                label="Featured Image (Accepted formats: PNG, JPEG, SVG.)"
                withAsterisk
                size="md"
                accept="image/png,image/jpeg,image/svg"
                icon={<FaUpload />}
                clearable
                radius="lg"
              />
              <CustomButton size="md" variant="filled" type="submit" title="Add Community" onClickHandler={() => void handleLogoUpload()} disabled={!profileImage} />
            </div>
          </Stepper.Step>
          <Stepper.Completed>Great job! Your community has been created. We&apos;ll publish it once it&apos;s approved.</Stepper.Completed>
        </Stepper>
      </form>
    </Container>
  );
}
