import { api } from "@/utils/api";
import { techFocusAreas, technologies } from "@/utils/constants";
import { Button, LoadingOverlay, MultiSelect, Select, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
import { string, z } from "zod";

interface CommunityUpdateModalProps {
  communityId: string;
}
export default function CommunityUpdateModal({ communityId }: CommunityUpdateModalProps) {
  const communityInfo = api.communities.getCommunityInfo.useQuery({ communityId });
  const updateCommunity = api.communities.updateCommunity.useMutation({
    onSuccess: () => {
      showNotification({
        title: "success",
        message: "Community details updated",
      });
    },
  });
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
        phone: string().min(10).optional(),
      })
    ),
  });

  function handleUpdate(values: typeof updateForm.values) {
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
    });
  }
  return (
    <div>
      <form onSubmit={updateForm.onSubmit((values) => handleUpdate(values))} className="flex flex-col gap-1">
        <LoadingOverlay visible={updateCommunity.isLoading || communityInfo.isLoading} />
        <TextInput {...updateForm.getInputProps("name")} label="Name" />
        <Textarea {...updateForm.getInputProps("description")} label="Desription" />
        <Select {...updateForm.getInputProps("focusArea")} data={[...techFocusAreas, "Others"]} label="Focus Area" searchable clearable />
        <MultiSelect {...updateForm.getInputProps("technologies")} data={technologies} label="Technologies" searchable clearable />
        <TextInput {...updateForm.getInputProps("github")} label="Github Url" />
        <TextInput {...updateForm.getInputProps("twitter")} label="Twitter Url" />
        <TextInput {...updateForm.getInputProps("linkedin")} label="Linkedin Url" />
        <TextInput {...updateForm.getInputProps("website")} label="Website Url" />
        <TextInput {...updateForm.getInputProps("whatsapp")} label="Whatsapp Group Link" />
        <TextInput {...updateForm.getInputProps("phone")} label="Contact Number" />
        <Button disabled={!updateForm.isValid() || updateCommunity.isLoading || communityInfo.isLoading} type="submit">
          Update
        </Button>
      </form>
    </div>
  );
}
