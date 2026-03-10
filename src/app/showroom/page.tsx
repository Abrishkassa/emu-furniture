import type { Metadata } from 'next';
import ShowRoomClient from './ShowRoomClient';

export const metadata: Metadata = {
  title: 'Showroom – EMU Furniture Hawassa',
  description: 'Visit our showroom to see our latest furniture collections in Hawassa, Sidama, Ethiopia.',
  keywords: ['furniture showroom hawassa', 'best furniture shop in hawassa', 'furniture display hawassa'],
  alternates: {
    canonical: 'https://emufurniturehawassa.com/blog',
  },
};

export default function Page() {
  return <ShowRoomClient />;
}