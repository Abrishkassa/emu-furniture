import type { Metadata } from 'next';
import ShopClient from './ShopClient'; // your client component

export const metadata: Metadata = {
  title: 'Shop Furniture – EMU Furniture Hawassa',
  description: 'Browse our collection of modern sofas, beds, dining tables, and office chairs in Hawassa, Ethiopia.',
  keywords: ['furniture shop hawassa', 'buy sofa hawassa', 'dining table ethiopia'],
  alternates: {
    canonical: 'https://emufurniturehawassa.com/shop',
  },
};

export default function ShopPage() {
  return <ShopClient />;
}