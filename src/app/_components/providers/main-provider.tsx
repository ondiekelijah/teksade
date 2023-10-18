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
      <MantineProvider>{children}</MantineProvider>
    </TRPCReactProvider>
  );
}
