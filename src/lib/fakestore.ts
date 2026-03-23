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

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    next: { revalidate: 60 * 60 }, // 1 hour
  });

  if (!res.ok) {
    throw new Error(`FakeStore request failed: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as T;
}

export async function fetchProducts(): Promise<FakeStoreProduct[]> {
  const products = await fetchJson<FakeStoreProduct[]>(`${FAKESTORE_BASE_URL}/products`);
  return products;
}

export async function fetchCategories(): Promise<string[]> {
  const categories = await fetchJson<string[]>(`${FAKESTORE_BASE_URL}/products/categories`);
  return categories;
}

export async function fetchProductsByCategory(category: string): Promise<FakeStoreProduct[]> {
  const products = await fetchJson<FakeStoreProduct[]>(
    `${FAKESTORE_BASE_URL}/products/category/${encodeURIComponent(category)}`
  );
  return products;
}

