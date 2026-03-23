import { NextResponse } from "next/server";
import { fetchProducts } from "@/lib/fakestore";

export async function GET() {
  try {
    const products = await fetchProducts();
    return NextResponse.json({ ok: true, products });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}

