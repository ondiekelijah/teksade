import ConnectSection from "./_components/sections/ConnectSection";
import Contribute from "./_components/sections/Contribute";
import Hero from "./_components/sections/Hero";
import NewsLetter from "./_components/sections/NewsLetter";
import PopularCommunities from "./_components/sections/PopularCommunities";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularCommunities />
      <ConnectSection />
      <NewsLetter />
      <Contribute />
    </>
  );
}
