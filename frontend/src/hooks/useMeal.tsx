import axios from "axios";
import { useEffect, useState } from "react";

import { getMealById } from "../api/mealsApi";
import type { Meal } from "../models/Meal";

function useMeal(mealId?: string) {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMeal() {
      if (!mealId) {
        setMeal(null);
        setError("Meal ID is missing.");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        setMeal(null);

        const result = await getMealById(mealId);

        setMeal(result);
      } catch (caughtError) {
        if (axios.isAxiosError(caughtError)) {
          if (caughtError.response?.status === 404) {
            setError("Meal not found.");
          } else if (caughtError.code === "ERR_NETWORK") {
            setError("Unable to connect to the backend.");
          } else {
            setError(
              caughtError.response?.data?.message ??
                "Unable to load meal."
            );
          }
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadMeal();
  }, [mealId]);

  return {
    meal,
    isLoading,
    error,
  };
}

export default useMeal;