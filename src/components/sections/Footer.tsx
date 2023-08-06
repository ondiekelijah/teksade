import { createStyles, Group, ActionIcon, rem } from "@mantine/core";
import Link from "next/link";
import { FaTwitter, FaGithub, FaYoutube } from "react-icons/fa";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${theme.spacing.md} ${theme.spacing.md}`,

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
    { link: "#contribute", label: "Contribute" },
    { link: "/about", label: "About Us" },
  ];
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Link color="dimmed" key={link.label} href={link.link}>
      {link.label}
    </Link>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <h2>Teksade</h2>

        <Group className={classes.links}>{items}</Group>

        <Group spacing="xs" position="right" noWrap>
          <ActionIcon size="lg" variant="default" radius="xl">
            <FaTwitter size="1.05rem" />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <FaGithub size="1.05rem" />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <FaYoutube size="1.05rem" />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}
