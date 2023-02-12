import React from 'react';
import Hero from '@/components/sections/Hero';
import { Footer } from '@/components/sections/Footer';
import { PopularCommunities } from '@/components/sections/PopularCommunities';
import { LatestJobs } from '@/components/sections/LatestJobs';
import { Subscribe } from '@/components/sections/Subscribe';
import { About } from '@/components/sections/About';
import { Contrib } from '@/components/sections/Contrib';
import SEO from '@/components/SEO';

export default function Home() {
  return (
    <>
      <SEO />
      <Hero />
      <main className='mx-auto container px-6 sm:px-8'>
        <div className='mt-16 space-y-20'>
          <PopularCommunities />
          <About />
          <LatestJobs />
          <Subscribe />
          <Contrib />
        </div>
      </main>
    </>
  );
}
