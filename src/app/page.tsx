import type { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'EMU Furniture Hawassa | Furniture Shop in Hawassa, Ethiopia',
  description:
    'EMU Furniture Hawassa sells modern sofas, beds, dining tables, office chairs, and custom furniture in Hawassa, Ethiopia.',
  keywords: [
    'EMU Furniture Hawassa',
    'Furniture in Hawassa',
    'Sofa in Hawassa',
    'Bed in Hawassa',
    'Modern Furniture Ethiopia',
    'Furniture Shop in Hawassa',
  ],
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