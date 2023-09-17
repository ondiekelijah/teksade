await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
import withPWA from 'next-pwa';


// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable:process.env.NODE_ENV === 'development'
})({
  reactStrictMode : true,
    images: {
    domains: ["firebasestorage.googleapis.com"],
  },
});

