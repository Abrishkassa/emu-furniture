import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'EMU Furniture | Furniture Shop in Hawassa, Ethiopia',
  description:
  'EMU Furniture in Hawassa offers quality sofas, beds, dining tables, and custom furniture. Visit our showroom for modern designs and fair prices.',
   keywords: [
  'emu furniture',
  'emu furniture hawassa',
  'furniture shop in hawassa',
  'furniture in hawassa ethiopia',
  'custom furniture hawassa',
  'modern furniture hawassa',
],
  verification: {
    google: 'iGWjhSjTemPqngmWsQyLLSCkOnMeJvc5GwOuDR7NP0k',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://emufurniturehawassa.com/',
  },
};

export default function Page() {
  return <HomeClient />;
}