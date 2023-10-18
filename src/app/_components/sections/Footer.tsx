import { Group, ActionIcon } from "@mantine/core";
import Link from "next/link";
import { FaTwitter, FaGithub } from "react-icons/fa";
import Container from "../custom-components/container";

export default function Footer() {
  const links = [
    { link: "https://github.com/ondiekelijah/teksade", label: "Contribute" },
    { link: "/about", label: "About Us" },
    { link: "/terms", label: "Terms" },
  ];

  const socialLinks = [
    { href: "https://twitter.com/teksadehq", icon: FaTwitter },
    { href: "https://github.com/ondiekelijah/teksade", icon: FaGithub },
  ];

  const items = links.map((link) => (
    <Link
      color="dimmed"
      key={link.label}
      href={link.link}
      target={link.link.startsWith("http") ? "_blank" : "_self"}
    >
      {link.label}
    </Link>
  ));

  return (
    <Container>
      <div className="">
        <div className="">
          <h2>Teksade</h2>
          <Group className={` text-center text-base`}>{items}</Group>
          <div>
            {socialLinks.map((socialLink, index) => (
              <Link key={index} href={socialLink.href} passHref>
                <ActionIcon size="lg" variant="default" radius="xl">
                  <socialLink.icon />
                </ActionIcon>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
