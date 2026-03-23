import { NextResponse } from "next/server";
import { fetchCategories } from "@/lib/fakestore";

export async function GET() {
  try {
    const categories = await fetchCategories();
    return NextResponse.json({ ok: true, categories });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 502 });
  }
}

