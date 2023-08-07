/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "@/utils/api";
import { countries } from "@/utils/constants";
import { useUser } from "@clerk/nextjs";
import { Button, LoadingOverlay, Select, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import React, { useEffect } from "react";
import { z } from "zod";

export default function ProfilePage() {
  const { user } = useUser();
  const currentUser = api.members.getMemberInfo.useQuery({ memberId: user?.id ?? "" });
  const updateUserInfo = api.members.updateMemberInfo.useMutation();
  useEffect(() => {
    currentUser.refetch;
  });
  const form = useForm<{
    name?: string;
    email?: string;
    phone?: string;
    institution?: string;
    role?: string;
    about?: string;
    country?: string;
    location?: string;
    github?: string;
    portfolio?: string;
    twitter?: string;
    linkedin?: string;
  }>({
    validateInputOnBlur: true,
    initialValues: {
      name: currentUser.data?.name ?? user?.fullName ?? "",
      email: currentUser.data?.email ?? user?.primaryEmailAddress?.toString() ?? undefined,
      phone: currentUser.data?.phone ?? user?.primaryPhoneNumber?.toString() ?? undefined,
      institution: currentUser.data?.institution ?? undefined,
      role: currentUser.data?.role ?? undefined,
      about: currentUser.data?.about ?? undefined,
      country: currentUser.data?.country ?? undefined,
      location: currentUser.data?.location ?? undefined,
      github: currentUser.data?.github ?? undefined,
      portfolio: currentUser.data?.website ?? undefined,
      twitter: currentUser.data?.twitter ?? undefined,
      linkedin: currentUser.data?.linkedin ?? undefined,
    },
    validate: zodResolver(
      z.object({
        name: z.string().nonempty().min(3),
        email: z.string().email(),
        institution: z.string().nonempty().min(3),
        role: z.string().nonempty().min(3),
        about: z.string().min(8).optional(),
        github: z.string().url().optional(),
        portfolio: z.string().url().optional(),
        twitter: z.string().url().optional(),
        linkedin: z.string().url().optional(),
      })
    ),
  });
  if (updateUserInfo.error) {
    showNotification({
      title: "An error occured",
      message: updateUserInfo.error.message,
    });
  }
  return (
    <div className=" container mx-auto">
      <p className=" text-center">Update your profile for better visibility</p>
      <p className=" text-center">Fields Marked with asterisk are mandatory for a basic profile</p>

      <form
        onSubmit={form.onSubmit((values) => {
          updateUserInfo.mutate({
            memberId: user?.id ?? "",
            name: values.name ?? currentUser.data?.name ?? user?.fullName ?? null,
            email: values.email ?? currentUser.data?.email ?? user?.primaryEmailAddress?.toString() ?? null,
            phone: values.phone ?? currentUser.data?.phone ?? user?.primaryPhoneNumber?.toString() ?? null,
            institution: values.institution ?? currentUser.data?.institution ?? null,
            role: values.role ?? currentUser.data?.role ?? null,
            about: values.about ?? currentUser.data?.about ?? null,
            country: values.country ?? currentUser.data?.country ?? null,
            location: values.location ?? currentUser.data?.location ?? null,
            github: values.github ?? currentUser.data?.github ?? null,
            website: values.portfolio ?? currentUser.data?.website ?? null,
            twitter: values.twitter ?? currentUser.data?.twitter ?? null,
            linkedin: values.linkedin ?? currentUser.data?.linkedin ?? null,
          });
        })}
        className=" mx-auto sm:w-[60vw] sm:px-16"
      >
        <LoadingOverlay visible={updateUserInfo.isLoading} />
        <TextInput {...form.getInputProps("name")} label="Name" withAsterisk required />
        <div className=" grid grid-cols-1 gap-2 sm:grid-cols-2">
          <TextInput {...form.getInputProps("email")} label="Email" withAsterisk required />
          <TextInput {...form.getInputProps("phone")} label="Phone" />
        </div>

        <div className=" grid grid-cols-1 gap-2 sm:grid-cols-2">
          <TextInput {...form.getInputProps("institution")} label="Institution" withAsterisk required placeholder="e.g UoN / Airtel Kenya" />
          <TextInput {...form.getInputProps("role")} label="Role" withAsterisk required placeholder="e.g Student / Frontend developer" />
        </div>
        <Textarea {...form.getInputProps("about")} label="About" placeholder=" A short description of yourself and  your craft" />
        <div className=" grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Select {...form.getInputProps("country")} data={countries} label="Country" searchable withAsterisk required />
          <TextInput {...form.getInputProps("location")} label="Location" />
        </div>
        <TextInput {...form.getInputProps("github")} label="Github URL" />
        <TextInput {...form.getInputProps("portfolio")} label="Portfolio URL" />
        <TextInput {...form.getInputProps("twitter")} label="Twitter URL" />
        <TextInput {...form.getInputProps("linkedin")} label="Linkedin URL" />
        <div className=" my-2 flex justify-end">
          <Button disabled={!form.isTouched() && !form.isValid()} type="submit">
            Update Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
