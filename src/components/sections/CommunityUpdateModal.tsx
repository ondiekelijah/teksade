import { api } from "@/utils/api";
import { techFocusAreas, technologies } from "@/utils/constants";
import { storageBucket } from "@/utils/firestoreConfig";
import { Avatar, FileInput, LoadingOverlay, MultiSelect, Select, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { deleteObject, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { useDownloadURL, useUploadFile } from "react-firebase-hooks/storage";
import { string, z } from "zod";
import CustomButton from "../custom-components/button";
import useMantineNotify from "@/hooks/useNotify";

interface CommunityUpdateModalProps {
  communityId: string;
  onSubmission?: () => void;
}
export default function CommunityUpdateModal({ communityId }: CommunityUpdateModalProps) {
  const queryClient = api.useContext();
  const communityInfo = api.communities.getCommunityInfo.useQuery({ communityId });
  const { notifySuccess } = useMantineNotify();

  const updateCommunity = api.communities.updateCommunity.useMutation({
    onSuccess: () => {
      notifySuccess({
        message: "Community information has been updated.",
      });
      void queryClient.communities.getCommunityInfo.invalidate({ communityId });
    },
  });
  const [logoImage, loading] = useDownloadURL(ref(storageBucket, `logos/${communityInfo.data?.logo_link}`));
  const [uploadFile, uploading, , error] = useUploadFile();
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);

  useEffect(() => {
    updateForm.setValues({
      name: communityInfo.data?.name,
      focusArea: communityInfo.data?.focus_area,
      description: communityInfo.data?.description,
      location: communityInfo.data?.location,
      technologies: communityInfo.data?.technologies,
      github: communityInfo.data?.github ? communityInfo.data.github : undefined,
      twitter: communityInfo.data?.twitter ? communityInfo.data.twitter : undefined,
      linkedin: communityInfo.data?.linkedin ? communityInfo.data.linkedin : undefined,
      website: communityInfo.data?.website ? communityInfo.data.website : undefined,
      whatsapp: communityInfo.data?.whatsapp ? communityInfo.data.whatsapp : undefined,
      phone: communityInfo.data?.phone ? communityInfo.data.phone : undefined,
      youtube: communityInfo.data?.youtube ? communityInfo.data.youtube : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communityInfo.data]);
  const updateForm = useForm<{
    name?: string;
    focusArea?: string;
    description?: string;
    location?: string;
    technologies?: string[];
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
    whatsapp?: string;
    phone?: string;
    youtube?: string;
  }>({
    validateInputOnBlur: true,
    validate: zodResolver(
      z.object({
        name: z.string().nonempty("Required").min(3, "Name is too short"),
        description: z.string().nonempty("Required").min(8, "Short Description"),
        location: z.string().nonempty("Provide a location"),
        focusArea: z.string().nonempty("Select a focus area"),
        github: z.string().url().optional(),
        twitter: z.string().url().optional(),
        linkedin: z.string().url().optional(),
        website: z.string().url().optional(),
        whatsapp: z.string().url().optional(),
        phone: z.string().min(10).optional(),
        youtube: z.string().url().optional(),
      })
    ),
  });

  function changeProfileImage() {
    if (newProfileImage) {
      const oldProfileRef = ref(storageBucket, `logos/${communityInfo.data?.logo_link}`);
      deleteObject(oldProfileRef)
        .then(() => {
          void (async () => {
            await uploadFile(ref(storageBucket, `logos/${communityInfo.data?.logo_link}`), newProfileImage);
          })();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  function handleUpdate(values: typeof updateForm.values) {
    changeProfileImage();
    updateCommunity.mutate({
      communityID: communityId,
      name: values.name,
      description: values.description,
      location: values.location,
      technologies: values.technologies,
      focusArea: values.focusArea,
      github: values.github,
      twitter: values.twitter,
      linkedin: values.linkedin,
      website: values.website,
      whatsapp: values.website,
      phone: values.phone,
      youtube: values.youtube,
    });
    // Refresh community info - not working
    void communityInfo.refetch();
  }
  if (error) {
    console.log(error.message);
  }
  return (
    <div>
      <div className="flex cursor-pointer items-center gap-x-2 py-4">
        <Avatar src={logoImage} size="xl" radius="xs" className=" object-cover" />
        <FileInput value={newProfileImage} onChange={setNewProfileImage} variant="unstyled" placeholder="Update cover image" />
      </div>
      <form onSubmit={updateForm.onSubmit((values) => handleUpdate(values))} className="flex flex-col gap-1">
        <LoadingOverlay visible={updateCommunity.isLoading || communityInfo.isLoading} />
        <TextInput {...updateForm.getInputProps("name")} size="md" label="Name" />
        <Textarea {...updateForm.getInputProps("description")} size="md" label="Desription" />
        <Select {...updateForm.getInputProps("focusArea")} size="md" data={[...techFocusAreas, "Others"]} label="Focus Area" searchable clearable />
        <MultiSelect {...updateForm.getInputProps("technologies")} size="md" data={technologies} label="Technologies" searchable clearable />
        <TextInput {...updateForm.getInputProps("github")} size="md" label="GitHub Profile URL" />
        <TextInput {...updateForm.getInputProps("twitter")} size="md" label="Twitter Profile URL" />
        <TextInput {...updateForm.getInputProps("linkedin")} size="md" label="LinkedIn Profile URL" />
        <TextInput {...updateForm.getInputProps("website")} size="md" label="Website URL" />
        <TextInput {...updateForm.getInputProps("whatsapp")} size="md" label="WhatsApp Group Link" />
        <TextInput {...updateForm.getInputProps("phone")} size="md" label="Contact Number" />
        <TextInput {...updateForm.getInputProps("youtube")} size="md" label="YouTube Channel Link" />
        <div className="my-6 flex justify-center">
          <CustomButton size="lg" className="text-base" variant="filled" type="submit" title="Save Changes" disabled={!updateForm.isValid() || updateCommunity.isLoading || communityInfo.isLoading} />
        </div>
      </form>
    </div>
  );
}
