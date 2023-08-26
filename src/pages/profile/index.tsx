/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "@/utils/api";
import { countries } from "@/utils/constants";
import { useUser } from "@clerk/nextjs";
import { Button, LoadingOverlay, Select, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useMantineColorScheme } from "@mantine/core";
import Container from "@/components/custom-components/container";
import useMantineNotify from "@hooks/useNotify";

interface ProfileFormValues {
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
};

export default function ProfilePage() {
  const { user } = useUser();
  const initialUserId = user?.id;
  const currentUser = api.members.getMemberInfo.useQuery({ memberId: initialUserId ?? "" });
  const updateUserInfo = api.members.updateMemberInfo.useMutation();
  const [hasErrorNotified, setHasErrorNotified] = useState(false);
  const [hasSuccessNotified, setHasSuccessNotified] = useState(false);
  const [formInitialValues, setFormInitialValues] = useState({});
  const {notifySuccess, notifyError} = useMantineNotify();

  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const currentFormValues = {
    name: currentUser.data?.name ?? user?.fullName ?? "",
    email: currentUser.data?.email ?? user?.primaryEmailAddress?.toString() ?? "",
    phone: currentUser.data?.phone ?? user?.primaryPhoneNumber?.toString() ?? "",
    institution: currentUser.data?.institution ?? "",
    role: currentUser.data?.role ?? "",
    about: currentUser.data?.about ?? "",
    country: currentUser.data?.country ?? "",
    location: currentUser.data?.location ?? "",
    github: currentUser.data?.github ?? "",
    portfolio: currentUser.data?.website ?? "",
    twitter: currentUser.data?.twitter ?? "",
    linkedin: currentUser.data?.linkedin ?? "",
  };

  useEffect(() => {
    if (initialUserId) {
      currentUser.refetch;
    }
  });

  useEffect(() => {
    if (currentUser.data) {
      setFormInitialValues(currentFormValues);
    }
  }, [currentUser.data]);

  // Try using form.setFieldValues instead of setFormInitialValues
  useEffect(() => {
    if (currentUser.data) {
      form.setFieldValue("name", currentUser.data?.name ?? user?.fullName ?? "");
      form.setFieldValue("email", currentUser.data?.email ?? user?.primaryEmailAddress?.toString() ?? "");
      form.setFieldValue("phone", currentUser.data?.phone ?? user?.primaryPhoneNumber?.toString() ?? "");
      form.setFieldValue("institution", currentUser.data?.institution ?? "");
      form.setFieldValue("role", currentUser.data?.role ?? "");
      form.setFieldValue("about", currentUser.data?.about ?? "");
      form.setFieldValue("country", currentUser.data?.country ?? "");
      form.setFieldValue("location", currentUser.data?.location ?? "");
      form.setFieldValue("github", currentUser.data?.github ?? "");
      form.setFieldValue("portfolio", currentUser.data?.website ?? "");
      form.setFieldValue("twitter", currentUser.data?.twitter ?? "");
      form.setFieldValue("linkedin", currentUser.data?.linkedin ?? "");
    }
  }, [currentUser.data]);

  const form = useForm<ProfileFormValues>({
    validateInputOnBlur: true,
    initialValues: formInitialValues,
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

  const handleFormSubmit = (values: ProfileFormValues) => {
    // Reset notification states on a new form submit
    setHasErrorNotified(false);
    setHasSuccessNotified(false);
    updateUserInfo.mutate({
      memberId: user?.id ?? "",
      ...currentFormValues,
    });
  };

  useEffect(() => {
    if (updateUserInfo.error && !hasErrorNotified) {
      notifyError ({
        title: "An error occured",
        message: updateUserInfo.error.message,
      });
      setHasErrorNotified(true); // Set the state to true after showing the notification
    }
  }, [updateUserInfo.error]);

  useEffect(() => {
    if (updateUserInfo.isSuccess && !hasSuccessNotified) {
      notifySuccess  ({
        title: "Profile Updated",
        message: "Your profile has been updated successfully",
      });
      setHasSuccessNotified(true); // Set the state to true after showing the notification
    }
  }, [updateUserInfo.isSuccess]);

  return (
    <Container className={"py-20"}>
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Connect Better, Update Your Profile!</h1>
        <p className={`mt-4 ${dark ? "text-slate-400" : "text-slate-600"}`}>Adding more details to your profile helps in building stronger connections.</p>
      </div>

      <form onSubmit={form.onSubmit(handleFormSubmit)} className={` mx-auto sm:w-[60vw] sm:px-16 `}>
        <LoadingOverlay visible={updateUserInfo.isLoading} />
        <TextInput {...form.getInputProps("name")} label="Name" withAsterisk size="md" required className="mb-4" />

        <div className=" mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <TextInput {...form.getInputProps("email")} size="md" label="Email" withAsterisk required />
          <TextInput {...form.getInputProps("phone")} size="md" label="Phone" />
        </div>

        <div className=" mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <TextInput {...form.getInputProps("institution")} size="md" label="Institution" withAsterisk required placeholder="e.g UoN / Airtel Kenya" />
          <TextInput {...form.getInputProps("role")} size="md" label="Role" withAsterisk required placeholder="e.g Student / Frontend developer" />
        </div>

        <Textarea {...form.getInputProps("about")} size="md" label="About" placeholder=" A short description of yourself and  your craft" className="mb-4" />

        <div className=" mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Select {...form.getInputProps("country")} data={countries} size="md" label="Country" searchable withAsterisk required />
          <TextInput {...form.getInputProps("location")} size="md" label="Location" />
        </div>

        <div className=" mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <TextInput {...form.getInputProps("github")} size="md" label="Github URL" />
          <TextInput {...form.getInputProps("portfolio")} size="md" label="Portfolio URL" />
        </div>

        <div className=" mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          <TextInput {...form.getInputProps("twitter")} size="md" label="Twitter URL" />
          <TextInput {...form.getInputProps("linkedin")} size="md" label="Linkedin URL" />
        </div>

        <div className="my-6 flex justify-center">
          <Button disabled={!form.isTouched() && !form.isValid()} type="submit" size="lg" className="rounded-full text-base">
            Save Changes
          </Button>
        </div>
      </form>
    </Container>
  );
}
