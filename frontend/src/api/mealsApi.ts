import { API_BASE_URL } from "./apiConfig";
import type { Meal } from "../models/Meal";

export async function getMeals(): Promise<Meal[]> {
  const response = await fetch(`${API_BASE_URL}/meals`);

  if (!response.ok) {
    throw new Error(`Failed to fetch meals: ${response.status}`);
  }

  return response.json();
}

export async function getMealsByCategory(categoryId: string): Promise<Meal[]> {
  const response = await fetch(`${API_BASE_URL}/meals/category/${categoryId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch meals: ${response.status}`);
  }

  return response.json();
}

export async function getMealById(id: string): Promise<Meal> {
  const response = await fetch(`${API_BASE_URL}/meals/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Meal not found.");
    }

    throw new Error(`Failed to fetch meal: ${response.status}`);
  }

  const meal: Meal = await response.json();

  return meal;
}
