/* eslint-disable @next/next/no-img-element */
import { api } from "@/utils/api";
import { Button, Loader, TextInput } from "@mantine/core";
import React from "react";
import Container from "@/components/custom-components/container";
import { useMantineColorScheme } from "@mantine/core";
import useMantineNotify from "@/hooks/useNotify";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import CustomButton from "../custom-components/button";
import Image from "next/image";

export default function NewsLetter() {
  const addSubscriber = api.newsletter.subscribeToNewsletter.useMutation();

  const { notifyError, notifySuccess } = useMantineNotify();

  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const form = useForm<{
    email: string;
  }>({
    validateInputOnBlur: true,
    validate: zodResolver(
      z.object({
        // trim spaces from email
        email: z
          .string()
          .email("Invalid email")
          .nonempty("")
          .transform((val) => val.trim()),
      })
    ),
  });

  function handleSubscribe() {
    void addSubscriber.mutateAsync(
      // strip spaces from email
      { email: form.values.email.trim() },
      {
        onSuccess: (returnValue) => {
          if (returnValue) {
            if (typeof returnValue === "boolean") {
              notifySuccess({ title: "Success! 🎉", message: "You've just hopped onto an exciting journey with us." });
              // Reset form
              form.reset();
              form.setFieldValue("email", "");
            } else {
              notifyError({ title: "Error", message: returnValue });
            }
          }
        },
      }
    );
  }

  return (
    <Container>
      <div className="mx-auto flex w-full flex-col items-center gap-y-4 rounded-lg px-8 py-20 my-20">
        <h1 className="whitespace-nowrap text-center text-4xl font-extrabold tracking-normal sm:text-5xl lg:text-6xl">Visionary Vibes & Voices</h1>
        <p className={`text-center text-base sm:text-xl ${dark ? "text-slate-400" : "text-slate-600"}`}>
          Teksade is your compass to global tech communities. Subscribe, and never lose your way in the digital realm!
        </p>
        <div className="relative flex w-full max-w-lg items-center">
          <TextInput radius="xl" size="lg" required error {...form.getInputProps("email")} className="w-full" placeholder="Your email" />
          {addSubscriber.isLoading ? (
            <div className="absolute bottom-0 left-0 right-0 top-0 z-20 flex items-center justify-center">
              <Loader />
            </div>
          ) : (
            <CustomButton size="md" className="absolute right-1 top-1 z-20 rounded-full" variant="gradient" title="Subscribe" onClickHandler={handleSubscribe} />
          )}
        </div>
      </div>
    </Container>
  );
}
