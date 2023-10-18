import "@mantine/core/styles.css";
import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { ColorSchemeScript } from "@mantine/core";
import MainProvider from "./_components/providers/main-provider";
import { ClerkProvider } from "@clerk/nextjs";

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
          <MainProvider>{children}</MainProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
