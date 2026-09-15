import axios from "axios";
import { useEffect, useState } from "react";

import { getCategories } from "../api/categoriesApi";
import { getMealsByCategory } from "../api/mealsApi";
import type { Meal } from "../models/Meal";

function useMeals(categoryId?: string) {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categoryTitle, setCategoryTitle] = useState("Meals");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMeals() {
      if (!categoryId) {
        setMeals([]);
        setCategoryTitle("Meals");
        setError("Category ID is missing.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        setMeals([]);

        const [mealsResult, categoriesResult] = await Promise.all([
          getMealsByCategory(categoryId),
          getCategories(),
        ]);

        setMeals(mealsResult);

        const selectedCategory = categoriesResult.find(
          (category) => category.groupId === categoryId,
        );

        setCategoryTitle(selectedCategory?.title ?? "Meals");
      } catch (caughtError) {
        if (axios.isAxiosError(caughtError)) {
          if (caughtError.code === "ERR_NETWORK") {
            setError("Unable to connect to the backend.");
          } else {
            setError(
              caughtError.response?.data?.message ?? "Unable to load meals.",
            );
          }
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadMeals();
  }, [categoryId]);
 
  return {
    meals,
    categoryTitle,
    isLoading,
    error,
  };
}

export default useMeals;
