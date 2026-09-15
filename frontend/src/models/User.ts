import { Meal } from "./Meal";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  recipeIds: string[];
  bookmarkedMealIds: string[];
}
