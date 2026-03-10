import type { Metadata } from 'next';
import CustomClient from './CustomClient';

export const metadata: Metadata = {
  title: 'Custom Furniture – EMU Furniture Hawassa',
  description: 'Explore our custom furniture options in Hawassa, Sidama, Ethiopia.',
  keywords: ['custom furniture hawassa', 'best furniture designer in hawassa', 'furniture design hawassa'],
  alternates: {
    canonical: 'https://emufurniturehawassa.com/blog',
  },
};

export default function Page() {
  return <CustomClient />;
}