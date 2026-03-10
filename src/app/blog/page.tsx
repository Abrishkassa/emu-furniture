import type { Metadata } from 'next';
import ProfileClient from './ProfileClient';

export const metadata: Metadata = {
  title: 'Profile – EMU Furniture Hawassa',
  description: 'Visit our profile page to learn more about our company, values, and company history.',
  keywords: ['furniture companies in hawassa', 'emu furniture', 'big furniture shop in hawassa','furniture company in hawassa Ethiopia'],
  alternates: {
    canonical: 'https://emufurniturehawassa.com/blog',
  },
};

export default function Page() {
  return <ProfileClient />;
}