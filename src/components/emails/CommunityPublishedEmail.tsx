import { Body, Button, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Tailwind, Text } from "@react-email/components";
import * as React from "react";

interface CommunityPublishedEmaillProps {
  communityName: string;
  communityId: string;
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

export const CommunityPublishedEmail = ({ communityName = "Tech community", communityId }: CommunityPublishedEmaillProps) => {
  const previewText = `🎉 Community ${communityName} published on Teksade`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              🎉<strong>{communityName}</strong> published on <strong>Teksade</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">Jambo there 👋,</Text>
            <Text className="text-[14px] leading-[24px] text-black">
              🚀 Great news! Your community {}(
              <Link href={`https://www.teksade.com/communities/${communityId}`} className="text-blue-600 no-underline">
                {communityName}
              </Link>
              ) has taken flight and is now live on <strong>Teksade</strong>! 🌟
            </Text>

            <Section className="mb-[32px] mt-[32px] text-center">
              <Button pX={20} pY={12} className="rounded bg-[#000000] text-center text-[12px] font-semibold text-white no-underline" href={`https://www.teksade.com/communities/${communityId}`}>
                Check it out
              </Button>
            </Section>

            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This email comes to you from the Teksade team in recognition of a community recently added to <Link href="https://www.teksade.com">Teksade</Link>. If this doesn&apos;t sound familiar,
              feel free to disregard this message. Should you have any concerns about the security of your account, please respond directly to this email, and we&apos;ll be here to assist you.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default CommunityPublishedEmail;
