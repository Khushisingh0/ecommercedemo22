import Image from "next/image";
import React from "react";
import type { FakeStoreProduct } from "@/lib/fakestore";

function Stars({ rating }: { rating: number }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const isFilled = i < filled;
        return (
          <svg
            key={i}
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill={isFilled ? "currentColor" : "transparent"}
            stroke="currentColor"
            strokeWidth="1"
            className="text-[color:var(--primary)]"
            aria-hidden="true"
          >
            <path d="M10 1.7l2.5 5.8 6.2.6-4.7 4 1.4 6-5.4-3.2-5.4 3.2 1.4-6-4.7-4 6.2-.6L10 1.7z" />
          </svg>
        );
      })}
    </div>
  );
}

export function ProductCard({ product }: { product: FakeStoreProduct }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] shadow-sm">
      <div className="relative aspect-[4/3] w-full bg-[color:var(--surface)]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-5"
          priority={product.id <= 4}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-[color:var(--foreground)]">
            {product.title}
          </h3>
          <div className="whitespace-nowrap text-sm font-semibold text-[color:var(--foreground)]">
            ${product.price.toFixed(2)}
          </div>
        </div>

        <Stars rating={product.rating.rate} />
        <p className="line-clamp-3 text-xs leading-5 text-[color:var(--muted)]">{product.description}</p>

        <div className="mt-auto pt-1">
          <div className="text-[11px] font-medium text-[color:var(--muted)]">
            Category: <span className="text-[color:var(--foreground)]">{product.category}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

