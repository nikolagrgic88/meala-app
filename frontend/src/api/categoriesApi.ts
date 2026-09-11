import { API_BASE_URL } from "./apiConfig";
import type { Category } from "../models/Category";

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }

  const categories: Category[] = await response.json();

  return categories;
}
