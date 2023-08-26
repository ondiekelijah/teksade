import Head from "next/head";
import { useRouter } from "next/router";
import siteMetadata from "@/data/siteMetadata";

interface CommonSEOProps {
  title: string;
  description: string;
  ogType: string;
  ogImage: string | { url: string }[];
  twImage: string;
  canonicalUrl?: string;
}

const CommonSEO = ({ title, description, ogType, ogImage, twImage, canonicalUrl }: CommonSEOProps) => {
  const router = useRouter();

  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />
      <meta property="og:url" content={`${siteMetadata.siteUrl}${router.asPath}`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      {Array.isArray(ogImage) ? (
        ogImage.map((imageObj) => <meta property="og:image" content={imageObj.url} key={imageObj.url} />)
      ) : (
        <meta property="og:image" content={ogImage} key={ogImage} />
      )}    
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteMetadata.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twImage} />
      <link rel="canonical" href={canonicalUrl ? canonicalUrl : `${siteMetadata.siteUrl}${router.asPath}`} />
    </Head>
  );
};

interface PageSEOProps {
  title: string;
  description: string;
}

export const PageSEO = ({ title, description }: PageSEOProps) => {
  const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner;
  const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner;
  return <CommonSEO title={title} description={description} ogType="website" ogImage={ogImageUrl} twImage={twImageUrl} />;
};

interface CommunitySEOProps {
  name: string;
  description: string;
  logoLink: string;
  website: string;
  technologies: string[];
  country: string;
  location: string;
  focusArea: string;
}

export const CommunitySEO = ({ name, description, logoLink, website, technologies, country, location, focusArea }: CommunitySEOProps) => {
  const router = useRouter();

  const featuredImage = {
    "@type": "ImageObject",
    url: logoLink.includes("http") ? logoLink : siteMetadata.siteUrl + logoLink,
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": website || router.asPath,
    },
    name: name,
    image: featuredImage,
    // dateFounded: publishedAt,
    location: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: country,
        addressLocality: location,
      },
    },
    description: description,
    areaServed: focusArea,
    makesOffer: technologies.join(", "),
    logo: featuredImage,
  };

  const twImageUrl = featuredImage.url;

  return (
    <>
      <CommonSEO title={name} description={description} ogType="organization" ogImage={featuredImage.url} twImage={twImageUrl} canonicalUrl={website} />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
      </Head>
    </>
  );
};
