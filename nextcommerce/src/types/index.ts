// src/types/index.ts

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface ColorVariant {
  name: string;
  image: string;     
  hex?: string;      
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  images: string[];    
  colors?: ColorVariant[]; 
  sizes?: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}