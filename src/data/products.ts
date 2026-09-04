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
  inStock?: boolean;
  showInAllProducts?: boolean;
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
  updatedAt?: any;
}

export const PRODUCTS: Product[] = [
  {
    "id": "sarson-da-saag-pickle",
    "slug": "sarson-da-saag-pickle",
    "name": "Sarson Da Saag Pickle (Sarson Da Saag Achar)",
    "urduName": "سرسوں دا ساگ کا اچار",
    "category": "pickles",
    "categoryName": "Pickles",
    "originalPrice": 850,
    "price": 589,
    "discountBadge": "-30%",
    "isBestSeller": true,
    "isNew": false,
    "image": "https://nisarachar.com/cdn/shop/files/02_2ec724f6-078a-47e4-b64a-57cd5f305606_533x.jpg",
    "hoverImage": "https://nisarachar.com/cdn/shop/files/1_f5d5b353-617f-4ca6-ae85-3da84d1e4f8e_533x.jpg",
    "images": [
      "https://nisarachar.com/cdn/shop/files/02_2ec724f6-078a-47e4-b64a-57cd5f305606_533x.jpg",
      "https://nisarachar.com/cdn/shop/files/1_f5d5b353-617f-4ca6-ae85-3da84d1e4f8e_533x.jpg"
    ],
    "weights": [
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "500g": 589,
      "1kg": 1050
    },
    "description": "Sarson Da Saag Pickle is a unique Punjabi delicacy made from fresh mustard greens, aromatic spices, and pure mustard oil. Perfectly preserved to deliver an authentic taste of home with every meal.",
    "ingredients": "Mustard Greens (Sarson), Pure Mustard Oil, Fennel Seeds, Nigella Seeds, Turmeric, Red Chili, Salt, Spices.",
    "benefits": "Rich in fiber and vitamins A, C, & K. Boosts immunity and aids digestion.",
    "rating": 4.9,
    "reviewsCount": 142
  },
  {
    "id": "aamla-pickle",
    "slug": "aamla-pickle",
    "name": "Amla Pickle (Amla Achar)",
    "urduName": "آملہ کا اچار",
    "category": "pickles",
    "categoryName": "Pickles",
    "originalPrice": 850,
    "price": 629,
    "discountBadge": "-26%",
    "isBestSeller": true,
    "isNew": false,
    "image": "https://nisarachar.com/cdn/shop/files/04_e50c3509-8de8-4347-8386-7c1317eb893c_533x.jpg",
    "hoverImage": "https://nisarachar.com/cdn/shop/files/2_2_533x.jpg",
    "images": [
      "https://nisarachar.com/cdn/shop/files/04_e50c3509-8de8-4347-8386-7c1317eb893c_533x.jpg",
      "https://nisarachar.com/cdn/shop/files/2_2_533x.jpg"
    ],
    "weights": [
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "500g": 629,
      "1kg": 1150
    },
    "description": "Fresh Indian Gooseberry (Amla) pickled with traditional desi spices and cold-pressed oil. Packed with Vitamin C and digestive benefits.",
    "ingredients": "Fresh Amla, Mustard Oil, Fenugreek, Mustard Seeds, Red Chili Powder, Salt, Hing.",
    "benefits": "High source of natural Vitamin C. Supports hair health, skin glow, and gut health.",
    "rating": 4.8,
    "reviewsCount": 98
  },
  {
    "id": "lahori-lasoora-pickle",
    "slug": "lahori-lasoora-pickle",
    "name": "Lahori Lasoora Pickle (Lahori Lasoora Achar)",
    "urduName": "لاہوری لیسوڑا کا اچار",
    "category": "pickles",
    "categoryName": "Pickles",
    "originalPrice": 750,
    "price": 589,
    "discountBadge": "-21%",
    "isBestSeller": true,
    "isNew": false,
    "image": "https://nisarachar.com/cdn/shop/files/01_e8785eb1-16a7-4ebe-a073-40cf7dce0210_533x.jpg",
    "hoverImage": "https://nisarachar.com/cdn/shop/files/3_2_533x.jpg",
    "images": [
      "https://nisarachar.com/cdn/shop/files/01_e8785eb1-16a7-4ebe-a073-40cf7dce0210_533x.jpg",
      "https://nisarachar.com/cdn/shop/files/3_2_533x.jpg"
    ],
    "weights": [
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "500g": 589,
      "1kg": 1050
    },
    "description": "Authentic Lahori style Gunda / Lasoora pickle prepared according to generations-old traditional recipe.",
    "ingredients": "Fresh Lasoora berries, Mustard oil, Rai, Kalonji, Saunf, Methi dana, Salt.",
    "benefits": "Traditional remedy for digestion and joint health.",
    "rating": 4.9,
    "reviewsCount": 210
  },
  {
    "id": "moringa-pickle",
    "slug": "moringa-pickle",
    "name": "Moringa Pickle (Moringa Achar)",
    "urduName": "مورنگا (سہانجنا) کا اچار",
    "category": "pickles",
    "categoryName": "Pickles",
    "originalPrice": 985,
    "price": 689,
    "discountBadge": "-30%",
    "isBestSeller": true,
    "isNew": true,
    "image": "https://nisarachar.com/cdn/shop/files/06_d241e5df-955b-4d06-acda-2420ffd7af15_533x.jpg",
    "hoverImage": "https://nisarachar.com/cdn/shop/files/6_1_533x.png",
    "images": [
      "https://nisarachar.com/cdn/shop/files/06_d241e5df-955b-4d06-acda-2420ffd7af15_533x.jpg",
      "https://nisarachar.com/cdn/shop/files/6_1_533x.png"
    ],
    "weights": [
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "500g": 689,
      "1kg": 1250
    },
    "description": "Superfood Moringa drumsticks combined with aromatic Pakistani pickle spices. Healthy and extremely flavorful.",
    "ingredients": "Moringa pods/roots, Mustard oil, Garlic, Fenugreek, Cumin, Turmeric, Salt.",
    "benefits": "Superfood packed with antioxidants, calcium, and anti-inflammatory properties.",
    "rating": 5,
    "reviewsCount": 84
  },
  {
    "id": "onion-pickle",
    "slug": "onion-pickle",
    "name": "Desi Pyaaz Pickle (Onion Achar)",
    "urduName": "دیسی پیاز کا اچار",
    "category": "pickles",
    "categoryName": "Pickles",
    "originalPrice": 750,
    "price": 549,
    "discountBadge": "-27%",
    "isBestSeller": false,
    "isNew": false,
    "image": "https://nisarachar.com/cdn/shop/files/02_00c0b731-9c48-4d3a-bf59-0ad7b9a3cfbe_533x.jpg",
    "hoverImage": "https://nisarachar.com/cdn/shop/files/4_62c1f1de-4c19-42a3-b8d3-a61d995b48fb_900x.png",
    "images": [
      "https://nisarachar.com/cdn/shop/files/02_00c0b731-9c48-4d3a-bf59-0ad7b9a3cfbe_533x.jpg",
      "https://nisarachar.com/cdn/shop/files/4_62c1f1de-4c19-42a3-b8d3-a61d995b48fb_900x.png"
    ],
    "weights": [
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "500g": 549,
      "1kg": 990
    },
    "description": "Crispy baby onions slow-marinated in mustard oil, green chilies, and tangy spices.",
    "ingredients": "Small Red Onions, Vinegar, Mustard Oil, Red Chili Flakes, Nigella Seeds, Salt.",
    "benefits": "Aids metabolism, heart health, and digestive comfort.",
    "rating": 4.7,
    "reviewsCount": 56
  },
  {
    "id": "hyderabad-mix-pickle",
    "slug": "hyderabad-mix-pickle",
    "name": "Hyderabad Mix Pickle (حیدرآباد مکس اچار)",
    "urduName": "حیدرآباد مکس اچار",
    "category": "pickles",
    "categoryName": "Pickles",
    "originalPrice": 850,
    "price": 599,
    "discountBadge": "-29%",
    "isBestSeller": true,
    "isNew": false,
    "image": "https://nisarachar.com/cdn/shop/files/02_2ec724f6-078a-47e4-b64a-57cd5f305606_533x.jpg",
    "hoverImage": "https://nisarachar.com/cdn/shop/files/1_f5d5b353-617f-4ca6-ae85-3da84d1e4f8e_533x.jpg",
    "images": [
      "https://nisarachar.com/cdn/shop/files/02_2ec724f6-078a-47e4-b64a-57cd5f305606_533x.jpg"
    ],
    "weights": [
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "500g": 599,
      "1kg": 1090
    },
    "description": "Hyderabadi style tangy mixed pickle blending green mango, carrot, lemon, green chili, and lasoora.",
    "ingredients": "Raw Mango, Carrot, Lemon, Green Chili, Lasoora, Mustard Oil, Spices.",
    "benefits": "Rich mix of vitamins and tangy traditional flavor.",
    "rating": 4.9,
    "reviewsCount": 312
  },
  {
    "id": "desi-lahsan-pickle",
    "slug": "desi-lahsan-pickle",
    "name": "Desi Lahsan Pickle (Garlic Achar)",
    "urduName": "دیسی لہسن کا اچار",
    "category": "pickles",
    "categoryName": "Pickles",
    "originalPrice": 890,
    "price": 649,
    "discountBadge": "-27%",
    "isBestSeller": true,
    "isNew": false,
    "image": "https://nisarachar.com/cdn/shop/files/01_e8785eb1-16a7-4ebe-a073-40cf7dce0210_533x.jpg",
    "hoverImage": "https://nisarachar.com/cdn/shop/files/3_2_533x.jpg",
    "images": [
      "https://nisarachar.com/cdn/shop/files/01_e8785eb1-16a7-4ebe-a073-40cf7dce0210_533x.jpg"
    ],
    "weights": [
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "500g": 649,
      "1kg": 1190
    },
    "description": "Desi small garlic cloves pickled in pure mustard oil and authentic spices.",
    "ingredients": "Desi Garlic Cloves, Mustard Oil, Red Chili, Coriander Seeds, Saunf, Salt.",
    "benefits": "Supports cardiovascular health, controls blood pressure and cholesterol.",
    "rating": 4.9,
    "reviewsCount": 175
  },
  {
    "id": "aamla-murabba",
    "slug": "aamla-murabba",
    "name": "Aamla Murabba (آملہ مربہ)",
    "urduName": "آملہ کا مربہ",
    "category": "murabba",
    "categoryName": "Murabbas",
    "originalPrice": 950,
    "price": 699,
    "discountBadge": "-26%",
    "isBestSeller": true,
    "isNew": false,
    "image": "https://nisarachar.com/cdn/shop/files/04_e50c3509-8de8-4347-8386-7c1317eb893c_533x.jpg",
    "hoverImage": "https://nisarachar.com/cdn/shop/files/2_2_533x.jpg",
    "images": [
      "https://nisarachar.com/cdn/shop/files/04_e50c3509-8de8-4347-8386-7c1317eb893c_533x.jpg"
    ],
    "weights": [
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "500g": 699,
      "1kg": 1290
    },
    "description": "Whole organic Amla fruit preserved in crystal clear sugar syrup and cardamom infusion.",
    "ingredients": "Fresh Organic Amla, Pure Sugar Syrup, Cardamom, Rose Water.",
    "benefits": "Excellent tonic for eyesight, memory boost, and skin vitality.",
    "rating": 4.8,
    "reviewsCount": 160
  },
  {
    "id": "quince-murabba",
    "slug": "quince-murabba",
    "name": "Quince Murabba (بہی کا مربہ)",
    "urduName": "بہی کا مربہ (سفرجل)",
    "category": "murabba",
    "categoryName": "Murabbas",
    "originalPrice": 1200,
    "price": 890,
    "discountBadge": "-25%",
    "isBestSeller": true,
    "isNew": true,
    "image": "https://nisarachar.com/cdn/shop/files/06_d241e5df-955b-4d06-acda-2420ffd7af15_533x.jpg",
    "hoverImage": "https://nisarachar.com/cdn/shop/files/6_1_533x.png",
    "images": [
      "https://nisarachar.com/cdn/shop/files/06_d241e5df-955b-4d06-acda-2420ffd7af15_533x.jpg"
    ],
    "weights": [
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "500g": 890,
      "1kg": 1650
    },
    "description": "Prophetic medicine / Tibb-e-Nabwi Quince fruit (Safargal) preserved in pure honey syrup.",
    "ingredients": "Fresh Quince fruit (Safarjal), Honey, Sugar Syrup, Saffron, Cardamom.",
    "benefits": "Strengthens heart muscles, relieves anxiety and gastric ulcers.",
    "rating": 5,
    "reviewsCount": 205
  },
  {
    "id": "apple-murabba",
    "slug": "apple-murabba",
    "name": "Apple Murabba (سیب کا مربہ)",
    "urduName": "سیب کا مربہ",
    "category": "murabba",
    "categoryName": "Murabbas",
    "originalPrice": 900,
    "price": 650,
    "discountBadge": "-28%",
    "isBestSeller": false,
    "isNew": false,
    "image": "https://nisarachar.com/cdn/shop/files/02_00c0b731-9c48-4d3a-bf59-0ad7b9a3cfbe_533x.jpg",
    "hoverImage": "https://nisarachar.com/cdn/shop/files/4_62c1f1de-4c19-42a3-b8d3-a61d995b48fb_900x.png",
    "images": [
      "https://nisarachar.com/cdn/shop/files/02_00c0b731-9c48-4d3a-bf59-0ad7b9a3cfbe_533x.jpg"
    ],
    "weights": [
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "500g": 650,
      "1kg": 1190
    },
    "description": "Delicious whole Kashmir apples infused with aromatic cardamom and saffron syrup.",
    "ingredients": "Kashmir Apples, Sugar Syrup, Saffron threads, Cardamom.",
    "benefits": "Heart health booster, calms nerves, and enhances stamina.",
    "rating": 4.8,
    "reviewsCount": 78
  },
  {
    "id": "carrot-murabba",
    "slug": "carrot-murabba",
    "name": "Desi Carrot Murabba (گاجر کا مربہ)",
    "urduName": "گاجر کا مربہ",
    "category": "murabba",
    "categoryName": "Murabbas",
    "originalPrice": 750,
    "price": 520,
    "discountBadge": "-30%",
    "isBestSeller": false,
    "isNew": false,
    "image": "https://nisarachar.com/cdn/shop/files/01_e8785eb1-16a7-4ebe-a073-40cf7dce0210_533x.jpg",
    "hoverImage": "https://nisarachar.com/cdn/shop/files/3_2_533x.jpg",
    "images": [
      "https://nisarachar.com/cdn/shop/files/01_e8785eb1-16a7-4ebe-a073-40cf7dce0210_533x.jpg"
    ],
    "weights": [
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "500g": 520,
      "1kg": 950
    },
    "description": "Red winter carrots simmered into a tender, sweet preserve rich in Beta-Carotene.",
    "ingredients": "Fresh Red Carrots, Sugar Syrup, Elaichi.",
    "benefits": "Improves vision, liver function, and skin radiometry.",
    "rating": 4.6,
    "reviewsCount": 45
  },
  {
    "id": "rose-petal-gulkand-murabba",
    "slug": "rose-petal-gulkand-murabba",
    "name": "Rose Petal Gulkand (گلکند)",
    "urduName": "گلکند (گلاب کے پتے)",
    "category": "murabba",
    "categoryName": "Murabbas",
    "originalPrice": 950,
    "price": 699,
    "discountBadge": "-26%",
    "isBestSeller": true,
    "isNew": true,
    "image": "https://nisarachar.com/cdn/shop/files/02_2ec724f6-078a-47e4-b64a-57cd5f305606_533x.jpg",
    "hoverImage": "https://nisarachar.com/cdn/shop/files/1_f5d5b353-617f-4ca6-ae85-3da84d1e4f8e_533x.jpg",
    "images": [
      "https://nisarachar.com/cdn/shop/files/02_2ec724f6-078a-47e4-b64a-57cd5f305606_533x.jpg"
    ],
    "weights": [
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "500g": 699,
      "1kg": 1290
    },
    "description": "Sun-cooked Damask rose petals blended with rock sugar for ultimate body cooling and digestive comfort.",
    "ingredients": "Organic Rose Petals (Desi Gulab), Crystal Sugar, Praval Pishti.",
    "benefits": "Cools acidity, reduces body heat, relieves fatigue and insomnia.",
    "rating": 4.9,
    "reviewsCount": 189
  },
  {
    "id": "aloo-bukhara-chutney",
    "slug": "aloo-bukhara-chutney",
    "name": "Special Aloo Bukhara Chutney (آلو بخارا چٹنی)",
    "urduName": "آلو بخارا کی چٹنی",
    "category": "chutney",
    "categoryName": "Chutney",
    "originalPrice": 850,
    "price": 599,
    "discountBadge": "-30%",
    "isBestSeller": true,
    "isNew": false,
    "image": "https://nisarachar.com/cdn/shop/files/04_e50c3509-8de8-4347-8386-7c1317eb893c_533x.jpg",
    "hoverImage": "https://nisarachar.com/cdn/shop/files/2_2_533x.jpg",
    "images": [
      "https://nisarachar.com/cdn/shop/files/04_e50c3509-8de8-4347-8386-7c1317eb893c_533x.jpg"
    ],
    "weights": [
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "500g": 599,
      "1kg": 1090
    },
    "description": "Sweet and tangy Dried Plum (Aloo Bukhara) chutney with melon seeds, almonds, and warm spices.",
    "ingredients": "Dried Plums, Melon Seeds (Char Magaz), Almonds, Sugar, Vinegar, Cumin, Red Chili.",
    "benefits": "Perfect accompaniment for biryani, pulao, barbecue, and weddings.",
    "rating": 4.9,
    "reviewsCount": 230
  },
  {
    "id": "imli-chutney",
    "slug": "imli-chutney",
    "name": "Khatti Meethi Imli Chutney (املی کی چٹنی)",
    "urduName": "املی کی چٹنی",
    "category": "chutney",
    "categoryName": "Chutney",
    "originalPrice": 650,
    "price": 450,
    "discountBadge": "-31%",
    "isBestSeller": true,
    "isNew": false,
    "image": "https://nisarachar.com/cdn/shop/files/01_e8785eb1-16a7-4ebe-a073-40cf7dce0210_533x.jpg",
    "hoverImage": "https://nisarachar.com/cdn/shop/files/3_2_533x.jpg",
    "images": [
      "https://nisarachar.com/cdn/shop/files/01_e8785eb1-16a7-4ebe-a073-40cf7dce0210_533x.jpg"
    ],
    "weights": [
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "500g": 450,
      "1kg": 820
    },
    "description": "Rich Tamarind pulp cooked with jaggery, black salt, and roasted cumin seeds.",
    "ingredients": "Pure Tamarind Pulp, Gur (Jaggery), Black Salt, Cumin, Red Chili.",
    "benefits": "Sparks appetite, stimulates digestive enzymes.",
    "rating": 4.8,
    "reviewsCount": 112
  },
  {
    "id": "khajoor-chutney",
    "slug": "khajoor-chutney",
    "name": "Khajoor Imli Chutney (کھجور املی چٹنی)",
    "urduName": "کھجور اور املی کی چٹنی",
    "category": "chutney",
    "categoryName": "Chutney",
    "originalPrice": 750,
    "price": 520,
    "discountBadge": "-30%",
    "isBestSeller": false,
    "isNew": false,
    "image": "https://nisarachar.com/cdn/shop/files/06_d241e5df-955b-4d06-acda-2420ffd7af15_533x.jpg",
    "hoverImage": "https://nisarachar.com/cdn/shop/files/6_1_533x.png",
    "images": [
      "https://nisarachar.com/cdn/shop/files/06_d241e5df-955b-4d06-acda-2420ffd7af15_533x.jpg"
    ],
    "weights": [
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "500g": 520,
      "1kg": 960
    },
    "description": "Sweet Arabian dates blended with tangy tamarind for a royal chutney experience.",
    "ingredients": "Soft Dates, Tamarind, Ginger Powder, Dry Spices, Rock Salt.",
    "benefits": "Natural instant energy boost from dates.",
    "rating": 4.7,
    "reviewsCount": 64
  },
  {
    "id": "chia-seeds",
    "slug": "chia-seeds",
    "name": "Organic Chia Seeds (چیا سیڈز)",
    "urduName": "چیا سیڈز (تخم شربتی)",
    "category": "super-foods",
    "categoryName": "Super Foods",
    "originalPrice": 850,
    "price": 599,
    "discountBadge": "-30%",
    "isBestSeller": true,
    "isNew": false,
    "image": "https://nisarachar.com/cdn/shop/files/02_00c0b731-9c48-4d3a-bf59-0ad7b9a3cfbe_533x.jpg",
    "hoverImage": "https://nisarachar.com/cdn/shop/files/4_62c1f1de-4c19-42a3-b8d3-a61d995b48fb_900x.png",
    "images": [
      "https://nisarachar.com/cdn/shop/files/02_00c0b731-9c48-4d3a-bf59-0ad7b9a3cfbe_533x.jpg"
    ],
    "weights": [
      "250g",
      "500g",
      "1kg"
    ],
    "weightPrices": {
      "250g": 349,
      "500g": 599,
      "1kg": 1090
    },
    "description": "100% Raw and clean black chia seeds. High in Omega-3 fatty acids, dietary fiber, and protein.",
    "ingredients": "100% Raw Chia Seeds.",
    "benefits": "Aids weight loss, regulates blood sugar, improves digestion.",
    "rating": 4.9,
    "reviewsCount": 155
  },
  {
    "id": "moringa-powder",
    "slug": "moringa-powder",
    "name": "Organic Moringa Powder (مورنگا پاؤڈر)",
    "urduName": "مورنگا (سہانجنا) کا پاؤڈر",
    "category": "super-foods",
    "categoryName": "Super Foods",
    "originalPrice": 750,
    "price": 499,
    "discountBadge": "-33%",
    "isBestSeller": true,
    "isNew": false,
    "image": "https://nisarachar.com/cdn/shop/files/02_2ec724f6-078a-47e4-b64a-57cd5f305606_533x.jpg",
    "hoverImage": "https://nisarachar.com/cdn/shop/files/1_f5d5b353-617f-4ca6-ae85-3da84d1e4f8e_533x.jpg",
    "images": [
      "https://nisarachar.com/cdn/shop/files/02_2ec724f6-078a-47e4-b64a-57cd5f305606_533x.jpg"
    ],
    "weights": [
      "250g",
      "500g"
    ],
    "weightPrices": {
      "250g": 499,
      "500g": 890
    },
    "description": "Shade-dried pure Moringa Oleifera leaf powder. Known as the Miracle Tree.",
    "ingredients": "100% Organic Pure Dried Moringa Leaves.",
    "benefits": "Contains 92 nutrients, 46 antioxidants, and 18 amino acids.",
    "rating": 4.9,
    "reviewsCount": 92
  },
  {
    "id": "pumpkin-seeds",
    "slug": "pumpkin-seeds",
    "name": "Raw Pumpkin Seeds (کدو کے بیج)",
    "urduName": "کدو کے بیج (پمپکن سیڈز)",
    "category": "super-foods",
    "categoryName": "Super Foods",
    "originalPrice": 950,
    "price": 699,
    "discountBadge": "-26%",
    "isBestSeller": false,
    "isNew": true,
    "image": "https://nisarachar.com/cdn/shop/files/04_e50c3509-8de8-4347-8386-7c1317eb893c_533x.jpg",
    "hoverImage": "https://nisarachar.com/cdn/shop/files/2_2_533x.jpg",
    "images": [
      "https://nisarachar.com/cdn/shop/files/04_e50c3509-8de8-4347-8386-7c1317eb893c_533x.jpg"
    ],
    "weights": [
      "250g",
      "500g"
    ],
    "weightPrices": {
      "250g": 420,
      "500g": 699
    },
    "description": "Premium quality shelled raw green pumpkin seeds rich in Zinc and Magnesium.",
    "ingredients": "100% Raw Pumpkin Seeds.",
    "benefits": "Boosts immunity, prostate health, and improves sleep quality.",
    "rating": 4.8,
    "reviewsCount": 40
  },
  {
    "id": "rose-water-syrup",
    "slug": "rose-water-syrup",
    "name": "Desi Gulab Sharbat / Syrup (شربت گلاب)",
    "urduName": "شربتِ دیسی گلاب",
    "category": "syrup",
    "categoryName": "Syrups",
    "originalPrice": 650,
    "price": 450,
    "discountBadge": "-31%",
    "isBestSeller": false,
    "isNew": false,
    "image": "https://nisarachar.com/cdn/shop/files/01_e8785eb1-16a7-4ebe-a073-40cf7dce0210_533x.jpg",
    "hoverImage": "https://nisarachar.com/cdn/shop/files/3_2_533x.jpg",
    "images": [
      "https://nisarachar.com/cdn/shop/files/01_e8785eb1-16a7-4ebe-a073-40cf7dce0210_533x.jpg"
    ],
    "weights": [
      "800ml"
    ],
    "weightPrices": {
      "800ml": 450
    },
    "description": "Pure distillate of fresh red roses blended into a refreshing summer drink.",
    "ingredients": "Distilled Rose Water, Cane Sugar, Silver Foil, Cardamom.",
    "benefits": "Instant heat reducer, refreshing summer drink.",
    "rating": 4.7,
    "reviewsCount": 51
  },
  {
    "id": "pickle-combo-bundle",
    "slug": "pickle-combo-bundle",
    "name": "Signature 4-in-1 Pickle Bundle Offer",
    "urduName": "سگنیچر 4-ان-1 اچار بنڈل",
    "category": "bundles",
    "categoryName": "Bundles",
    "originalPrice": 3200,
    "price": 2199,
    "discountBadge": "-31%",
    "isBestSeller": true,
    "isNew": true,
    "image": "https://nisarachar.com/cdn/shop/files/06_d241e5df-955b-4d06-acda-2420ffd7af15_533x.jpg",
    "hoverImage": "https://nisarachar.com/cdn/shop/files/6_1_533x.png",
    "images": [
      "https://nisarachar.com/cdn/shop/files/06_d241e5df-955b-4d06-acda-2420ffd7af15_533x.jpg"
    ],
    "weights": [
      "4 x 500g Jars"
    ],
    "weightPrices": {
      "4 x 500g Jars": 2199
    },
    "description": "Ultimate value pack! Contains 500g each of Sarson Saag Pickle, Lahori Lasoora Pickle, Amla Pickle, and Hyderabad Mix Pickle.",
    "ingredients": "4 Jars of top selling pickles.",
    "benefits": "Save Rs. 1,000+ with Free Delivery across Pakistan!",
    "rating": 5,
    "reviewsCount": 410
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug || p.id === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all' || category === 'all-products') return PRODUCTS;
  if (category === 'best-selling' || category === 'best-sellers' || category === 'best-selling-pickles') {
    return PRODUCTS.filter(p => p.isBestSeller);
  }
  if (category === 'new-arrivals') {
    return PRODUCTS.filter(p => p.isNew);
  }
  return PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
}
