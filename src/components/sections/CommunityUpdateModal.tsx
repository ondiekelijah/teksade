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
import useCheckImageType from "@/hooks/useCheckImageType";
import { FaUpload } from "react-icons/fa";

interface CommunityUpdateModalProps {
  communityId: string;
  onSubmission?: () => void;
}
export default function CommunityUpdateModal({ communityId }: CommunityUpdateModalProps) {
  const queryClient = api.useContext();
  const communityInfo = api.communities.getCommunityInfo.useQuery({ communityId });
  const { notifySuccess } = useMantineNotify();
  const [hasInteracted, setHasInteracted] = useState(false);

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
  const { isValidImageType } = useCheckImageType(newProfileImage);

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
      slack: communityInfo.data?.slack ? communityInfo.data.slack : undefined,
      discord: communityInfo.data?.discord ? communityInfo.data.discord : undefined,
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
    slack?: string;
    discord?: string;
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
        slack: z.string().url().optional(),
        discord: z.string().url().optional(),
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
  function handleImageChange(profileImage: File | null) {
    setHasInteracted(true); // Add this line
    setNewProfileImage(profileImage);
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
      slack: values.slack,
      discord: values.discord,
    });
    // Refresh community info - not working
    void communityInfo.refetch();
  }
  if (error) {
    console.log(error.message);
  }
  return (
    <div className="rounded-lg p-6 shadow-md">
      <div className="mb-8 flex flex-col items-center gap-4">
        <div className="mb-4 flex h-56 w-full justify-center">
          <img src={newProfileImage && isValidImageType ? URL.createObjectURL(newProfileImage) : logoImage} alt="cover-photo" className="h-full rounded-md object-cover shadow-sm" />
        </div>
        <FileInput
          placeholder="Update cover image"
          value={newProfileImage}
          onChange={setNewProfileImage}
          error={hasInteracted && !isValidImageType ? "Please upload a valid image." : null}
          label="Cover Image (Accepted formats: PNG, JPEG, SVG.)"
          withAsterisk
          size="md"
          accept="image/png,image/jpeg,image/svg"
          icon={<FaUpload />}
          clearable
          radius="lg"
          className="rounded-md border-2 border-dashed border-gray-300 p-2 text-sm"
        />
      </div>
      <form onSubmit={updateForm.onSubmit((values) => handleUpdate(values))} className="flex flex-col gap-1">
        <LoadingOverlay visible={communityInfo.isLoading} />
        <TextInput {...updateForm.getInputProps("name")} size="md" label="Name" />
        <Textarea {...updateForm.getInputProps("description")} size="md" label="Desription" />
        <Select {...updateForm.getInputProps("focusArea")} size="md" data={[...techFocusAreas, "Others"]} label="Focus Area" searchable clearable />
        <MultiSelect {...updateForm.getInputProps("technologies")} size="md" data={technologies} label="Technologies" searchable clearable />
        <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <TextInput {...updateForm.getInputProps("github")} size="md" label="GitHub Profile URL" />
          <TextInput {...updateForm.getInputProps("twitter")} size="md" label="Twitter Profile URL" />
          <TextInput {...updateForm.getInputProps("linkedin")} size="md" label="LinkedIn Profile URL" />
          <TextInput {...updateForm.getInputProps("website")} size="md" label="Website URL" />
          <TextInput {...updateForm.getInputProps("whatsapp")} size="md" label="WhatsApp Group Link" />
          <TextInput {...updateForm.getInputProps("phone")} size="md" label="Contact Number" />
          <TextInput {...updateForm.getInputProps("youtube")} size="md" label="YouTube Channel Link" />
          <TextInput {...updateForm.getInputProps("slack")} size="md" label="Slack Group Link" />
          <TextInput {...updateForm.getInputProps("discord")} size="md" label="Discord Group Link" />
        </div>

        <div className="my-6 flex justify-center">
          <CustomButton
            size="lg"
            className="text-base"
            variant="filled"
            type="submit"
            title={updateCommunity.isLoading || communityInfo.isLoading ? "Updating..." : "Update"}
            disabled={!updateForm.isValid() || updateCommunity.isLoading || communityInfo.isLoading}
          />
        </div>
      </form>
    </div>
  );
}
