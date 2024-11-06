import create from "zustand";

// Define your Zustand store
const useProductStore = create((set, get) => ({
  products: [],

  // Setter function to update products array
  setProducts: (newProducts) => set({ products: newProducts }),

  // Computed property for lowStockItems count
  lowStockItems: () =>
    get().products.filter((product) => product.stockLevel < 10).length,
}));
