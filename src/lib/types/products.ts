export type Product = {
  id: string; // Use string since Prisma uses cuid()
  name_en: string;
  name_am: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  material: string;
  dimensions: string;
  inStock: boolean;
  isPopular: boolean;
  isCustom: boolean;
  deliveryZones: string[];
  images: string[];
  estimatedWeeks: number | null;
};

export type ApiProduct = {
  id: string;
  nameEn: string;
  nameAm: string;
  descriptionEn: string;
  descriptionAm: string;
  price: number;
  currency: string;
  categoryEn: string;
  categoryAm: string;
  subCategory?: string;
  images: string[];
  length?: number;
  width?: number;
  height?: number;
  unit: string;
  material?: string;
  color?: string;
  inStock: boolean;
  stockQuantity: number;
  isPopular: boolean;
  isFeatured: boolean;
  rating: number;
  numberOfReviews: number;
  estimatedDelivery?: string;
  specifications?: any;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};