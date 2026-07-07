"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories, products } from "@/data/products";

const PAGE_SIZE = 12;

interface CatalogProps {
  onRequestProduct: (productName: string) => void;
}

export function Catalog({ onRequestProduct }: CatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const productsRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.mark?.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, page]);

  useEffect(() => {
    setPage(1);
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    requestAnimationFrame(() => {
      productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const activeCategoryLabel =
    categories.find((cat) => cat.id === activeCategory)?.label ?? "Все категории";

  return (
    <section id="catalog" className="section-padding">
      <div className="section-container">
        <SectionHeading
          label="Каталог"
          title="Приборы и лабораторное оборудование"
          description="Полный каталог ТОО «Скиф». Стоимость уточняйте у менеджера — подготовим коммерческое предложение."
        />

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-md flex-1">
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="search"
              placeholder="Поиск по названию или марке..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-navy-900 outline-none transition-all focus:border-brand-red focus:ring-2 focus:ring-brand-red/20"
            />
          </div>

          <p className="text-sm text-gray-500">
            {activeCategory === "all" ? (
              <>
                Найдено:{" "}
                <span className="font-semibold text-navy-900">
                  {filteredProducts.length}
                </span>{" "}
                {filteredProducts.length === 1
                  ? "позиция"
                  : filteredProducts.length < 5
                    ? "позиции"
                    : "позиций"}
              </>
            ) : (
              <>
                Категория:{" "}
                <span className="font-semibold text-brand-red">
                  {activeCategoryLabel}
                </span>
                {" — "}
                <span className="font-semibold text-navy-900">
                  {filteredProducts.length}
                </span>{" "}
                {filteredProducts.length === 1
                  ? "позиция"
                  : filteredProducts.length < 5
                    ? "позиции"
                    : "позиций"}
              </>
            )}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={activeCategory === "all"}
            onClick={() => handleCategoryChange("all")}
            className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all ${
              activeCategory === "all"
                ? "bg-brand-red text-white shadow-md ring-2 ring-brand-red/30"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Все категории
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              aria-pressed={activeCategory === cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-brand-red text-white shadow-md ring-2 ring-brand-red/30"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          <>
            <div
              ref={productsRef}
              className="mt-10 grid scroll-mt-28 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onRequest={onRequestProduct}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Назад
                </Button>
                <span className="text-sm text-gray-500">
                  Страница {page} из {totalPages}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Далее
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-16 text-center">
            <p className="text-lg text-gray-500">
              По вашему запросу ничего не найдено
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="mt-4 text-brand-red hover:underline"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
