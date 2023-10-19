import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { ColorSchemeScript } from "@mantine/core";
import MainProvider from "./_components/providers/main-provider";
import { ClerkProvider } from "@clerk/nextjs";
import MainLayout from "./_components/layouts/MainLayout";
import { TRPCReactProvider } from "@/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Teksade",
  description:
    "Welcome to Teksade. An easier and faster tech community discovery platform. Find your place among like-minded individuals.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TRPCReactProvider headers={headers()}>
      <ClerkProvider
        appearance={{
          variables: {
            colorPrimary: "#1A56DB",
          },
        }}
      >
        <html lang="en">
          <head>
            <ColorSchemeScript />
          </head>
          <body className={`font-sans ${inter.variable}`}>
            <MainProvider>
              <MainLayout>{children}</MainLayout>
            </MainProvider>
          </body>
        </html>
      </ClerkProvider>
    </TRPCReactProvider>
  );
}
