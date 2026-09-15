import axios from "axios";
import { useEffect, useState } from "react";

import { getCategories } from "../api/categoriesApi";
import type { Category } from "../models/Category";

function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoading(true);
        setError(null);
        setCategories([]);

        const results = await getCategories();

        setCategories(results);
      } catch (caughtError) {
        if (axios.isAxiosError(caughtError)) {
          if (caughtError.code === "ERR_NETWORK") {
            setError("Unable to connect to the backend.");
          } else {
            setError(
              caughtError.response?.data?.message ??
                "Unable to load categories."
            );
          }
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    }

    loadCategories();
  }, []);

  return {
    categories,
    isLoading,
    error,
  };
}

export default useCategories;