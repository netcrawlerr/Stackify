import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Products = {
  id: number;
  name: string;
  description: string;
  price: number;
  stockLevel: number;
  totalValue: number;
  categoryName: string;
  categoryId: number;
};

type ProductState = {
  products: Products[] | null;
  totalProductsCount: number;
  lowStockItems: () => Promise<void>;
  getTotalProducts: () => Promise<number | undefined>;
  getProducts: () => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  createProduct: (
    name: string,
    description: string,
    price: number,
    stockLevel: number,
    categoryId: string
  ) => Promise<void>;

  updateProduct: (
    id: number,
    name: string,
    description: string,
    price: number,
    stockLevel: number
  ) => Promise<void>;
};

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: null,
      lowStockItems: () =>
        (get().products || []).filter((product) => product.stockLevel < 10)
          .length,

      totalProductsCount: 0,
      getTotalProducts: async () => {
        const response = await axios.get("/api/products");
        const count = response.data.length;

        if (count > 0) {
          // console.log("Total Products = ", count);
          set({ totalProductsCount: count });
          return count;
        }

        return undefined;
      },
      getProducts: async () => {
        try {
          const response = await axios.get("/api/products");
          set({ products: response.data });
          // console.log("products in store from DB", response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      },
      deleteProduct: async (id: number) => {
        try {
          const response = await axios.delete(`/api/products/${id}`);
          const data = response.data;
          // console.log("Deleted Data just kidding", data);
        } catch (error) {
          console.log(error);
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
            price,
            stockLevel,
            categoryId: parseInt(categoryId),
          });
          // console.log("product creation response", response);

          set((state) => ({
            products: state.products
              ? [...state.products, response.data]
              : [response.data],
          }));

          await get().getProducts();
        } catch (error) {
          console.error("Error creating products:", error);
        }
      },
      updateProduct: async (
        id: number,
        name: string,
        description: string,
        price: number,
        stockLevel: number,
        categoryId: string
      ) => {
        try {
          const response = await axios.put(`/api/products/${id}`, {
            name,
            description,
            price,
            stockLevel,
            categoryId: parseInt(categoryId),
          });
          // console.log("Product update response", response);

          // Update the local state
          set((state) => ({
            products: state.products
              ? state.products.map((product) =>
                  product.id === id ? response.data : product
                )
              : null,
          }));

          await get().getProducts();
        } catch (error) {
          console.error("Error updating product:", error);
        }
      },
    }),

    {
      name: "product-storage",
    }
  )
);
