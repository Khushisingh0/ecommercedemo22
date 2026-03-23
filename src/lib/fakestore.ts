export type FakeStoreRating = {
  rate: number;
  count: number;
};

export type FakeStoreProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: FakeStoreRating;
};

const FAKESTORE_BASE_URL = "https://fakestoreapi.com";
const DEFAULT_HEADERS: Record<string, string> = {
  Accept: "application/json",
  // Some hosts block requests without a browser-like user agent.
  "User-Agent": "Mozilla/5.0 (compatible; BlueCart/1.0; +https://example.com)",
};

// Vercel builds/environments sometimes get 403 from FakeStore.
// This fallback keeps our site and APIs working even when the external API is blocked.
const FALLBACK_CATEGORIES = ["electronics", "jewelery", "men's clothing", "women's clothing"];

const FALLBACK_PRODUCTS: FakeStoreProduct[] = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the park. Fits 15" +
      " Laptops. Lightweight, durable, and versatile.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description: "Slim-fitting style, comfortable fabric, and affordable price.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879_.jpg",
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description: "Great outerwear for cool weather. Stylish and comfortable.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.3, count: 110 },
  },
  {
    id: 4,
    title: "Apple iPhone 13 Pro Max",
    price: 1249.99,
    description: "The iPhone 13 Pro Max is a pro-grade smartphone with great performance.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61U7T2qW9wL._AC_SX679_.jpg",
    rating: { rate: 4.6, count: 98 },
  },
  {
    id: 5,
    title: "Vintage Gold Plated Necklace",
    price: 129.99,
    description: "A timeless piece with a classic look. Perfect for gifting.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YA9n7w5UL._AC_UY879_.jpg",
    rating: { rate: 4.7, count: 220 },
  },
  {
    id: 6,
    title: "Women's Elegant Dress",
    price: 49.99,
    description: "Comfortable, breathable, and designed for everyday style.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: { rate: 4.2, count: 170 },
  },
];

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: DEFAULT_HEADERS,
    next: { revalidate: 60 * 60 }, // 1 hour
  });

  if (!res.ok) {
    throw new Error(`FakeStore request failed: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as T;
}

export async function fetchProducts(): Promise<FakeStoreProduct[]> {
  try {
    return await fetchJson<FakeStoreProduct[]>(`${FAKESTORE_BASE_URL}/products`);
  } catch (err) {
    console.warn("FakeStore fetchProducts failed, using fallback:", err);
    return FALLBACK_PRODUCTS;
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    return await fetchJson<string[]>(`${FAKESTORE_BASE_URL}/products/categories`);
  } catch (err) {
    console.warn("FakeStore fetchCategories failed, using fallback:", err);
    return FALLBACK_CATEGORIES;
  }
}

export async function fetchProductsByCategory(category: string): Promise<FakeStoreProduct[]> {
  try {
    return await fetchJson<FakeStoreProduct[]>(
      `${FAKESTORE_BASE_URL}/products/category/${encodeURIComponent(category)}`
    );
  } catch (err) {
    console.warn("FakeStore fetchProductsByCategory failed, using fallback:", err);
    return FALLBACK_PRODUCTS.filter((p) => p.category === category);
  }
}

