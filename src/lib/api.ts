const PRODUCTS_URL = "https://functions.poehali.dev/522d4ed0-2278-4af8-8fd3-32c9452b2c14";
const CATEGORIES_URL = "https://functions.poehali.dev/f1349cda-e146-402a-b9f9-650f00b78d68";
const ORDERS_URL = "https://functions.poehali.dev/c9722bf7-34c1-4da4-8b06-34f901dbe151";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  price_old: number | null;
  image_url: string;
  specs: Record<string, string | number>;
  brand: string;
  in_stock: boolean;
  category_name: string;
  category_slug: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface OrderItem {
  product_id: number;
  product_name: string;
  quantity: number;
  price: number;
}

export async function fetchProducts(params: {
  category?: string;
  brand?: string;
  price_min?: number;
  price_max?: number;
  search?: string;
} = {}): Promise<Product[]> {
  const query = new URLSearchParams();
  if (params.category) query.set("category", params.category);
  if (params.brand) query.set("brand", params.brand);
  if (params.price_min) query.set("price_min", String(params.price_min));
  if (params.price_max) query.set("price_max", String(params.price_max));
  if (params.search) query.set("search", params.search);

  const url = `${PRODUCTS_URL}${query.toString() ? "?" + query.toString() : ""}`;
  const res = await fetch(url);
  const raw = await res.json();
  const data = typeof raw === "string" ? JSON.parse(raw) : raw;
  return data.products;
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(CATEGORIES_URL);
  const raw = await res.json();
  const data = typeof raw === "string" ? JSON.parse(raw) : raw;
  return data.categories;
}

export async function createOrder(order: {
  name: string;
  phone: string;
  email: string;
  items: OrderItem[];
}): Promise<{ ok: boolean; order_id: number }> {
  const res = await fetch(ORDERS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  const raw = await res.json();
  return typeof raw === "string" ? JSON.parse(raw) : raw;
}
