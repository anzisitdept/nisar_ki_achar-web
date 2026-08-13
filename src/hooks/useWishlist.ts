import { useCart as useCartContext } from '@/context/CartContext';

export function useWishlist() {
  const { wishlist, toggleWishlist, isInWishlist } = useCartContext();
  return { wishlist, toggleWishlist, isInWishlist };
}
