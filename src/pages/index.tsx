import React from 'react';
import { Footer } from '@/components/sections/Footer';
import { PopularCommunities } from '@/components/sections/PopularCommunities';
import { RecentlyAdded } from '@/components/sections/RecentlyAdded';
import { Subscribe } from '@/components/sections/Subscribe';
import { About } from '@/components/sections/About';
import { Contrib } from '@/components/sections/Contrib';
import SEO from '@/components/SEO';
import Hero from '@/components/sections/Hero';

export default function Home() {
  return (
    <>
      <SEO />
      <Hero />
      <main className='mx-auto px-6 sm:px-8'>
        <>
          <PopularCommunities />
          <About />
          <RecentlyAdded />
          <Subscribe />
          <Contrib />
        </>
      </main>
    </>
  );
}
