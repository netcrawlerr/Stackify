import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Category = {
  id: number;
  categoryName: string;
  description: string;
};

type CategoryState = {
  categories: Category[] | null;
  getCategories: () => Promise<void>;
};

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      categories: null,
      getCategories: async () => {
        try {
          const response = await axios.get("/api/category");
          set({ categories: response.data });
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      },
    }),
    {
      name: "category-storage",
    }
  )
);
