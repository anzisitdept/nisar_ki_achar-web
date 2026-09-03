import { Product } from '@/types';

/**
 * Resolves the effective price for a product.
 * If product.price is set and > 0, it uses that.
 * Otherwise, it looks inside product.weightPrices:
 *   1. Prioritizes '1kg' (ignoring case and whitespace, e.g. '1kg', '1 kg', '1KG').
 *   2. If '1kg' is not present, uses the first weight from product.weights.
 *   3. If still not found, takes the first valid positive number in weightPrices.
 * If preferredWeight is supplied, that weight is checked first.
 */
export function getProductEffectivePrice(product: Partial<Product>, preferredWeight?: string): number {
  if (!product) return 0;

  const wp = product.weightPrices;
  const hasWeightPrices = wp && typeof wp === 'object' && Object.keys(wp).length > 0;

  // If a preferred weight is specified and exists in weightPrices
  if (preferredWeight && hasWeightPrices) {
    const directVal = wp[preferredWeight];
    if (typeof directVal === 'number' && directVal > 0) return directVal;

    // Case-insensitive match for preferredWeight
    const normalizedPref = preferredWeight.toLowerCase().replace(/\s+/g, '');
    for (const [key, val] of Object.entries(wp)) {
      if (key.toLowerCase().replace(/\s+/g, '') === normalizedPref && typeof val === 'number' && val > 0) {
        return val;
      }
    }
  }

  // If product.price is already a valid positive number
  if (typeof product.price === 'number' && product.price > 0) {
    return product.price;
  }

  // Otherwise, extract from weightPrices
  if (hasWeightPrices) {
    const entries = Object.entries(wp);

    // 1. Prioritize '1kg'
    const oneKgEntry = entries.find(([key]) => key.toLowerCase().replace(/\s+/g, '') === '1kg');
    if (oneKgEntry && typeof oneKgEntry[1] === 'number' && oneKgEntry[1] > 0) {
      return oneKgEntry[1];
    }

    // 2. Check product.weights in order
    if (Array.isArray(product.weights) && product.weights.length > 0) {
      for (const w of product.weights) {
        const val = wp[w];
        if (typeof val === 'number' && val > 0) return val;
      }
    }

    // 3. Any positive number in weightPrices
    for (const [, val] of entries) {
      if (typeof val === 'number' && val > 0) return val;
    }
  }

  return 0;
}

/**
 * Resolves the display weight label (e.g. '1kg').
 */
export function getProductDisplayWeight(product: Partial<Product>): string {
  if (!product) return '1kg';

  const wp = product.weightPrices;
  const hasWeightPrices = wp && typeof wp === 'object' && Object.keys(wp).length > 0;

  if (hasWeightPrices) {
    const keys = Object.keys(wp);
    const oneKgKey = keys.find(k => k.toLowerCase().replace(/\s+/g, '') === '1kg');
    if (oneKgKey) return '1kg';
  }

  if (Array.isArray(product.weights) && product.weights.length > 0) {
    const oneKg = product.weights.find(w => w.toLowerCase().replace(/\s+/g, '') === '1kg');
    if (oneKg) return '1kg';
    return product.weights[0];
  }

  return '1kg';
}

/**
 * Resolves the effective originalPrice.
 * Only returns a price if it is strictly greater than the effective price.
 */
export function getProductEffectiveOriginalPrice(product: Partial<Product>, effectivePrice?: number): number {
  if (!product) return 0;
  const currentPrice = effectivePrice !== undefined ? effectivePrice : getProductEffectivePrice(product);
  if (typeof product.originalPrice === 'number' && product.originalPrice > currentPrice) {
    return product.originalPrice;
  }
  return 0;
}

/**
 * Normalizes a product object so that price, originalPrice, and weights
 * are properly populated from weightPrices when general prices are omitted in the admin.
 */
export function normalizeProduct(product: Product): Product {
  const effectivePrice = getProductEffectivePrice(product);
  const effectiveOriginal = getProductEffectiveOriginalPrice(product, effectivePrice);

  // Ensure weights array contains at least display weight if weightPrices exists
  let weights = Array.isArray(product.weights) && product.weights.length > 0
    ? [...product.weights]
    : [];

  if (weights.length === 0 && product.weightPrices && typeof product.weightPrices === 'object') {
    weights = Object.keys(product.weightPrices);
  }
  if (weights.length === 0) {
    weights = ['1kg'];
  }

  return {
    ...product,
    price: effectivePrice,
    originalPrice: effectiveOriginal,
    weights
  };
}
