export type ProductCategory = string;

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  mark?: string;
}

export interface Category {
  id: ProductCategory;
  label: string;
}

export interface LeadFormData {
  name: string;
  phone: string;
  email: string;
  company: string;
  comment: string;
  productName?: string;
}

export interface CatalogProductJson {
  id: string;
  name: string;
  description: string;
  mark: string;
  price: number;
  category: string;
}

export interface CatalogJson {
  categories: Category[];
  products: CatalogProductJson[];
}
