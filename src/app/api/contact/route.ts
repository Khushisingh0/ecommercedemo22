import { NextResponse } from "next/server";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  message: z.string().min(10).max(2000),
});

type RateState = {
  windowStartMs: number;
  count: number;
};

// Simple in-memory rate limiting (works for demo/dev).
const rateMap = new Map<string, RateState>();

function getClientKey(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  // Next uses standard remote address in some environments; keep safe.
  return "local";
}

export async function POST(req: Request) {
  try {
    const clientKey = getClientKey(req);
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxRequests = 5;

    const prev = rateMap.get(clientKey);
    if (!prev || now - prev.windowStartMs > windowMs) {
      rateMap.set(clientKey, { windowStartMs: now, count: 1 });
    } else {
      if (prev.count >= maxRequests) {
        return NextResponse.json(
          { ok: false, error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
      prev.count += 1;
    }

    const body = (await req.json().catch(() => null)) as unknown;
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid input.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const payload = {
      ...parsed.data,
      receivedAt: new Date().toISOString(),
    };

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

