import {
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';
import { PRODUCTS, Product } from '@/data/products';
import { CATEGORIES, Category } from '@/data/categories';

/* ─── Products Real-Time Service ─────────────────────── */
export function subscribeProducts(callback: (products: Product[]) => void) {
  try {
    const productsRef = collection(db, 'products');
    return onSnapshot(
      productsRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const dynamicProducts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Product[];
          callback(dynamicProducts);
        } else {
          callback(PRODUCTS);
        }
      },
      (error) => {
        console.warn('Firestore Products error, using static fallback:', error);
        callback(PRODUCTS);
      }
    );
  } catch (err) {
    console.warn('Firestore connection failed:', err);
    callback(PRODUCTS);
    return () => {};
  }
}

/* ─── Categories Real-Time Service ───────────────────── */
export function subscribeCategories(callback: (categories: Category[]) => void) {
  try {
    const categoriesRef = collection(db, 'categories');
    return onSnapshot(
      categoriesRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const dynamicCategories = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Category[];
          callback(dynamicCategories);
        } else {
          callback(CATEGORIES);
        }
      },
      (error) => {
        console.warn('Firestore Categories error, using static fallback:', error);
        callback(CATEGORIES);
      }
    );
  } catch (err) {
    console.warn('Firestore Categories connection failed:', err);
    callback(CATEGORIES);
    return () => {};
  }
}

/* ─── Submit Order to Firestore ──────────────────────── */
export interface OrderPayload {
  orderId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  items: any[];
  subtotal: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: string;
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export async function saveOrderToFirestore(order: OrderPayload) {
  try {
    const ordersRef = collection(db, 'orders');
    const orderNumber = order.orderId || `SEK-${Math.floor(100000 + Math.random() * 900000)}`;
    const docRef = await addDoc(ordersRef, {
      ...order,
      orderId: orderNumber,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id, orderId: orderNumber };
  } catch (error) {
    console.error('Error saving order to Firestore:', error);
    return { success: false, error };
  }
}

/* ─── Submit Review to Firestore ─────────────────────── */
export interface ReviewPayload {
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  isVerified: boolean;
  status: 'pending' | 'approved' | 'rejected';
}

export async function saveReviewToFirestore(review: ReviewPayload) {
  try {
    const reviewsRef = collection(db, 'reviews');
    const docRef = await addDoc(reviewsRef, {
      ...review,
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving review to Firestore:', error);
    return { success: false, error };
  }
}

/* ─── TopBar Messages Real-Time Service ──────────────── */
export function subscribeTopBarMessages(callback: (messages: string[]) => void) {
  const fallback = [
    'GET 5% OFF ON ORDERS WITH ADVANCE PAYMENT.',
    '⚡ FREE NATIONWIDE SHIPPING ON ORDERS OVER RS. 2,999',
    '🎁 100% PURE & HOMEMADE DESI QUALITY GUARANTEED'
  ];

  try {
    const docRef = doc(db, 'store_content', 'topbar');
    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists() && docSnap.data().messages) {
          callback(docSnap.data().messages);
        } else {
          callback(fallback);
        }
      },
      (error) => {
        console.warn('Firestore TopBar error:', error);
        callback(fallback);
      }
    );
  } catch (err) {
    callback(fallback);
    return () => {};
  }
}
