"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onRequest: (productName: string) => void;
}

export function ProductCard({ product, onRequest }: ProductCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-3 text-lg font-bold text-navy-900">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
          <span className="text-lg font-bold text-brand-red">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            onClick={() => onRequest(product.name)}
            className="shrink-0"
          >
            Оставить заявку
          </Button>
        </div>
      </div>
    </article>
  );
}
