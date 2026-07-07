import catalogData from "../../data/products.json";
import type { CatalogJson, Category, Product } from "@/types";

const catalog = catalogData as CatalogJson;

const defaultImage =
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80";

const categoryImages: Record<string, string> = {
  "soil-aggregates":
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
  "cement-concrete":
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
  "asphalt-bitumen":
    "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80",
  "press-testing":
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  scales:
    "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&q=80",
  drying:
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
  "measuring-tools":
    "https://images.unsplash.com/photo-1581094794329-cd2f8eac8c3e?w=800&q=80",
  hygrometers:
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  thermometers:
    "https://images.unsplash.com/photo-1532187863486-abf9db8811d4?w=800&q=80",
  "lab-materials":
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
};

function buildDescription(item: CatalogJson["products"][number]): string {
  if (item.mark) {
    return `Марка: ${item.mark}`;
  }
  if (item.name.length > 160) {
    return `${item.name.slice(0, 160)}...`;
  }
  return item.name;
}

export const categories: Category[] = catalog.categories;

export const products: Product[] = catalog.products.map((item) => ({
  id: item.id,
  name: item.name,
  description: buildDescription(item),
  price: item.price,
  category: item.category,
  image: categoryImages[item.category] ?? defaultImage,
  mark: item.mark || undefined,
}));
