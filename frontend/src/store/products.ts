import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Products = {
  id: number;
  name: string;
  description: string;
  price: number;
  stockLevel: number;
  categoryName: string;
};

type ProductState = {
  products: Products[] | null;
  totalProductsCount: number;  
  getTotalProducts: () => Promise<number | undefined>; 
  getProducts: () => Promise<void>;
  createProduct: (
    name: string,
    description: string,
    price: number,
    stockLevel: number,
    categoryId: string
  ) => Promise<void>;
};

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: null,
      totalProductsCount: 0,  
      getTotalProducts: async () => {
        const response = await axios.get("/api/products");
        const count = response.data.length;

        if (count > 0) {
          console.log("Total Products = ", count);
          set({ totalProductsCount: count });  
          return count; 
        }

        return undefined; 
      },
      getProducts: async () => {
        try {
          const response = await axios.get("/api/products");
          set({ products: response.data });
          console.log("products in store from DB", response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      },
      createProduct: async (
        name: string,
        description: string,
        price: number,
        stockLevel: number,
        categoryId: string
      ) => {
        try {
          const response = await axios.post("/api/products", {
            name,
            description,
            categoryId: parseInt(categoryId),
            price,
            stockLevel,
          });
          console.log("product creation response", response);

          
          set((state) => ({
            products: state.products
              ? [...state.products, response.data]
              : [response.data],
          }));
        } catch (error) {
          console.error("Error creating products:", error);
        }
      },
    }),
    {
      name: "product-storage",
    }
  )
);
