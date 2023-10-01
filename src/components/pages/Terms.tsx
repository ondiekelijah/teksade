import { useMantineColorScheme } from "@mantine/core";
import Container from "../custom-components/container";
import siteMetadata from "@/data/siteMetadata";

interface SectionProps {
  title: string;
  subSections: SubSectionProps[];
  dark?: boolean;
}

interface SubSectionProps {
  title: string;
  content: string | JSX.Element;
  dark?: boolean;
}

const Section = ({ title, subSections, dark }: SectionProps) => {
  return (
    <div className="mb-8">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      {subSections?.map((subSection, index) => (
        <SubSection key={index} title={subSection.title} content={subSection.content} dark={dark} />
      ))}
    </div>
  );
};

const SubSection = ({ title, content, dark }: SubSectionProps) => {
  return (
    <div className="mb-4">
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className={`${dark ? "text-slate-400" : "text-slate-600"}`}>{content}</p>
    </div>
  );
};

export default function Terms() {
  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Container className="">
      <div className=" mx-auto flex flex-col gap-y-4 py-8">
        <h1 className="mb-2 text-4xl font-bold">Welcome to Teksade!</h1>
        <p className={`${dark ? "text-slate-400" : "text-slate-600"}`}>
          Welcome to Teksade, a community-driven platform connecting tech enthusiasts! This Privacy Policy is designed to help you understand how we collect, use, and safeguard your personal
          information. By using Teksade, you agree to the terms outlined in this policy.
        </p>
        {siteMetadata?.termsData.map((section, index) => (
          <Section key={index} title={section.title} subSections={section.subSections} dark={dark} />
        ))}

        {/* Contact Us Section */}
        <Section
          title="Contact Us"
          subSections={[
            {
              title: "Contact Information",
              content: (
                <span className={`${dark ? "text-slate-400" : "text-slate-600"}`}>
                  If you have any questions about our Terms of Service, please contact us at{" "}
                  <a href="mailto:contact@teksade.com" className="text-blue-500 hover:underline">
                    contact@teksade.com
                  </a>
                  .
                </span>
              ),
            },
          ]}
        />

        {/* Last Updated */}
        <p className={`${dark ? "text-slate-400" : "text-slate-600"}`}>
          <strong>Last Updated:</strong> [01/10/2023]
        </p>
      </div>
    </Container>
  );
}
