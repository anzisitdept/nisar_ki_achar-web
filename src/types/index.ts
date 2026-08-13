export interface Product {
  id: string;
  slug: string;
  name: string;
  urduName: string;
  category: string;
  categoryName: string;
  originalPrice: number;
  price: number;
  discountBadge: string;
  isBestSeller: boolean;
  isNew: boolean;
  image: string;
  hoverImage: string;
  images: string[];
  weights: string[];
  weightPrices: Record<string, number>;
  description: string;
  ingredients: string;
  benefits: string;
  rating: number;
  reviewsCount: number;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  urduName: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  cartId: string;
  productId: string;
  slug: string;
  name: string;
  urduName: string;
  price: number;
  originalPrice: number;
  image: string;
  selectedWeight: string;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  productSlug?: string;
  productName?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface FilterState {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  inStockOnly?: boolean;
}
