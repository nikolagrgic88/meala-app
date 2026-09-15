import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import type { Meal } from "../models/Meal";
import apiClient from "./apiClient";

export async function getMeals(): Promise<Meal[]> {
  const response = await apiClient.get<Meal[]>(`${API_BASE_URL}/meals`);

  return response.data;
}

export async function getMealsByCategory(categoryId: string): Promise<Meal[]> {
  const response = await apiClient.get<Meal[]>(
    `${API_BASE_URL}/meals/category/${categoryId}`,
  );

  return response.data;
}

export async function getMealById(id: string): Promise<Meal> {
  const response = await apiClient.get<Meal>(`${API_BASE_URL}/meals/${id}`);

  return response.data;
}
