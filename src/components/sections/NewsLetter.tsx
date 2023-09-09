/* eslint-disable @next/next/no-img-element */
import { api } from "@/utils/api";
import { Button, TextInput } from "@mantine/core";
import React from "react";
import Container from "@/components/custom-components/container";
import { useMantineColorScheme } from "@mantine/core";
import useMantineNotify from "@/hooks/useNotify";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import CustomButton from "../custom-components/button";

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
        email: z.string().email("Invalid email").nonempty(""),
      })
    ),
  });

  function handleSubscribe() {
    void addSubscriber.mutateAsync(
      // strip spaces from email
      { email: form.values.email.trim() },
      {
        onSuccess: () => {
          notifySuccess({ title: "Success! 🎉", message: "You've just hopped onto an exciting journey with us." });
          // Reset form
          form.reset();
          form.setFieldValue("email", "");
        },
        onError: () => {
          notifyError({ title: "Error", message: "Opps! That did not go well. Please try again!" });
        },
      }
    );
  }

  return (
    <Container>
      <div className="mx-auto my-20 grid w-full grid-cols-1 gap-3 rounded-lg px-8 py-10 shadow-lg sm:grid-cols-2">
        <div className=" flex  w-full grow flex-col  justify-center gap-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Visionary Vibes & Voices</h1>
          <p className={`text-base sm:text-xl ${dark ? "text-slate-400" : "text-slate-600"}`}>
            Teksade is your compass to global tech communities. Subscribe, and never lose your way in the digital realm!{" "}
          </p>
          <div className=" relative flex w-full items-center">
            <TextInput radius="xl" size="lg" required error {...form.getInputProps("email")} className=" w-full" placeholder="Your email" />
            <CustomButton size="md" className=" absolute right-1 top-1 z-20 rounded-full" variant="gradient" title="Subscribe" onClickHandler={handleSubscribe} />
          </div>
        </div>
        <img src="/img/newsletter.svg" className=" order-first h-80 w-80  justify-self-end sm:order-last" alt="news letter" />
      </div>
    </Container>
  );
}
