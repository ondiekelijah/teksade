import { createStyles, Group, ActionIcon, rem } from "@mantine/core";
import Link from "next/link";
import { FaTwitter, FaGithub, FaYoutube } from "react-icons/fa";
import Container from "@/components/custom-components/container";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: `${theme.spacing.md}`,
    paddingBottom: `${theme.spacing.md}`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.sm,
    },
  },
}));

export default function Footer() {
  const links = [
    { link: "/communities", label: "Communities" },
    { link: "https://github.com/ondiekelijah/teksade", label: "Contribute" },
    { link: "/about", label: "About Us" },
  ];

  const socialLinks = [
    { href: "https://twitter.com/teksadehq", icon: FaTwitter },
    { href: "https://github.com/ondiekelijah/teksade", icon: FaGithub },
  ];

  const { classes } = useStyles();
  const items = links.map((link) => (
    <Link color="dimmed" key={link.label} href={link.link} target={link.link.startsWith("http") ? "_blank" : "_self"}>
      {link.label}
    </Link>
  ));

  return (
    <Container>
      <div className={classes.footer}>
        <div className={classes.inner}>
          <h2>Teksade</h2>
          <Group className={classes.links}>{items}</Group>
          <Group spacing="xs" position="right" noWrap>
            {socialLinks.map((socialLink, index) => (
              <Link key={index} href={socialLink.href} passHref>
                <ActionIcon size="lg" variant="default" radius="xl">
                  <socialLink.icon />
                </ActionIcon>
              </Link>
            ))}
          </Group>
        </div>
      </div>
    </Container>
  );
}
