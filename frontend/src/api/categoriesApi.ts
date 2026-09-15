import { API_BASE_URL } from "./apiConfig";
import type { Category } from "../models/Category";
import axios from "axios";
import apiClient from "./apiClient";

export async function getCategories(): Promise<Category[]> {
  const response = await apiClient.get<Category[]>(
    `${API_BASE_URL}/categories`,
  );

  return response.data;
}
