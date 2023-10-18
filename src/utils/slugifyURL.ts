type SlugifyURL = (name: string) => string;

const slugifyURL: SlugifyURL = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export default slugifyURL;
