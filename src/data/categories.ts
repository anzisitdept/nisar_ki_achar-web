export interface Category {
  id: string;
  slug: string;
  name: string;
  urduName: string;
  description: string;
  image: string;
  itemCount: number;
}

export const CATEGORIES: Category[] = [
  {
    id: 'pickles',
    slug: 'pickles',
    name: 'Desi Pickles (اچار)',
    urduName: 'دیسی اچار',
    description: '100% Homemade, pure mustard oil based traditional Pakistani pickles prepared with natural herbs and spices.',
    image: 'https://nisarachar.com/cdn/shop/files/02_2ec724f6-078a-47e4-b64a-57cd5f305606_533x.jpg',
    itemCount: 15
  },
  {
    id: 'murabba',
    slug: 'murabba',
    name: 'Authentic Murabbas (مربہ)',
    urduName: 'دیسی مربہ جات',
    description: 'Prophetic Tibb-e-Nabwi preserves made from organic fruits, pure sugar syrup, cardamom, and saffron.',
    image: 'https://nisarachar.com/cdn/shop/files/04_e50c3509-8de8-4347-8386-7c1317eb893c_533x.jpg',
    itemCount: 8
  },
  {
    id: 'chutney',
    slug: 'chutney',
    name: 'Special Chutneys (چٹنی)',
    urduName: 'دیسی چٹنی',
    description: 'Mouthwatering sweet and spicy chutneys made from Aloo Bukhara, Tamarind, Dates, and Fresh Herbs.',
    image: 'https://nisarachar.com/cdn/shop/files/01_e8785eb1-16a7-4ebe-a073-40cf7dce0210_533x.jpg',
    itemCount: 6
  },
  {
    id: 'super-foods',
    slug: 'super-foods',
    name: 'Super Foods & Seeds (سپر فوڈز)',
    urduName: 'سپر فوڈز اور بیج',
    description: 'Pure organic seeds, Moringa powder, Chia seeds, and raw natural boosters for daily health and energy.',
    image: 'https://nisarachar.com/cdn/shop/files/06_d241e5df-955b-4d06-acda-2420ffd7af15_533x.jpg',
    itemCount: 7
  },
  {
    id: 'syrup',
    slug: 'syrup',
    name: 'Organic Syrups (شربت)',
    urduName: 'دیسی شربت',
    description: 'Refreshing traditional herbal distillates and rose syrups made from pure natural botanicals.',
    image: 'https://nisarachar.com/cdn/shop/files/02_00c0b731-9c48-4d3a-bf59-0ad7b9a3cfbe_533x.jpg',
    itemCount: 4
  },
  {
    id: 'best-selling-pickles',
    slug: 'best-selling-pickles',
    name: 'Best Selling Items (بہترین ڈیزائن)',
    urduName: 'سب سے زیادہ فروخت ہونے والی',
    description: 'Our most loved pickles, murabbas, and chutneys ordered by thousands of happy customers across Pakistan.',
    image: 'https://nisarachar.com/cdn/shop/files/MAINN_WEB.jpg',
    itemCount: 12
  },
  {
    id: 'bundles',
    slug: 'bundles',
    name: 'Special Bundle Offers (بنڈل افر)',
    urduName: 'خصوصی بنڈل آفرز',
    description: 'Exclusive combo packs offering maximum savings and free home delivery nationwide.',
    image: 'https://nisarachar.com/cdn/shop/files/06_d241e5df-955b-4d06-acda-2420ffd7af15_533x.jpg',
    itemCount: 5
  }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(c => c.slug === slug || c.id === slug);
}
