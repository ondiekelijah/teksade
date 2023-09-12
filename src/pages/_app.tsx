import { api } from "@/utils/api";
import "@/styles/globals.css";
import { type AppProps } from "next/app";
import Head from "next/head";
import { type ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { ClerkProvider } from "@clerk/nextjs";
import MainLayout from "@/components/layouts/MainLayout";
import { useState } from "react";
import GAnalytics from "@/components/analytics/index";
import { Analytics } from '@vercel/analytics/react';


function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value ?? (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <GAnalytics />
        <Analytics />
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#1A56DB",
            },
          }}
          {...pageProps}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              /** Put your mantine theme override here */
              colorScheme: colorScheme,
              primaryColor: "teksade",
              primaryShade: 6,
              colors: {
                dark: ["#ffffff", "#acaebf", "#8c8fa3", "#666980", "#4d4f66", "#34354a", "#2b2c3d", "#1d1e30", "#0c0d21", "#01010a"],
                teksade: ["#ACC8FF", "#81ACFF", "#5A92FF", "#377AFF", "#1F68FF", "#175CF7", "#1A56DB", "#0847D5", "#003AD0", "#0031C3"],
              },
              loader: "dots",
              fontFamily: "Epilogue, sans-serif",
            }}
          >
            <ModalsProvider>
              <Notifications position="top-center" />
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </ModalsProvider>
          </MantineProvider>
        </ClerkProvider>
      </ColorSchemeProvider>
    </>
  );
}
export default api.withTRPC(App);
