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
    console.warn("FakeStore fetchProducts failed, returning empty list:", err);
    return [];
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    return await fetchJson<string[]>(`${FAKESTORE_BASE_URL}/products/categories`);
  } catch (err) {
    console.warn("FakeStore fetchCategories failed, returning empty list:", err);
    return [];
  }
}

export async function fetchProductsByCategory(category: string): Promise<FakeStoreProduct[]> {
  try {
    return await fetchJson<FakeStoreProduct[]>(
      `${FAKESTORE_BASE_URL}/products/category/${encodeURIComponent(category)}`
    );
  } catch (err) {
    console.warn("FakeStore fetchProductsByCategory failed, returning empty list:", err);
    return [];
  }
}

