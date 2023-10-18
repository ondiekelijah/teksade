import { headers } from "next/headers";
import { TRPCReactProvider } from "@/trpc/react";
import { MantineProvider } from "@mantine/core";
import React, { type ReactNode } from "react";

interface MainProviderProps {
  children: ReactNode;
}
export default function MainProvider({ children }: MainProviderProps) {
  return (
    <TRPCReactProvider headers={headers()}>
      <MantineProvider
        theme={{
          /** Put your mantine theme override here */
          primaryColor: "teksade",
          primaryShade: 6,
          colors: {
            dark: [
              "#ffffff",
              "#acaebf",
              "#8c8fa3",
              "#666980",
              "#4d4f66",
              "#34354a",
              "#2b2c3d",
              "#1d1e30",
              "#0c0d21",
              "#01010a",
            ],
            teksade: [
              "#ACC8FF",
              "#81ACFF",
              "#5A92FF",
              "#377AFF",
              "#1F68FF",
              "#175CF7",
              "#1A56DB",
              "#0847D5",
              "#003AD0",
              "#0031C3",
            ],
          },
          fontFamily: "Epilogue, sans-serif",
        }}
      >
        {children}
      </MantineProvider>
    </TRPCReactProvider>
  );
}
