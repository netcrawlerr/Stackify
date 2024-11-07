
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Suppliers = {
  id: number;
  supplierName: string;
  category: string;
  rating: number;
  email: string;
  dateJoined: string;
  mostSoldItem: string;
  status: string;
  phone: string;
};

type SupplierState = {
  suppliers: Suppliers[] | null;
  addSupplier: (data: Omit<Suppliers, "id">) => Promise<void>;
};

export const useSupplierStore = create<SupplierState>()(
  persist(
    (set) => ({
      suppliers: null,
      addSupplier: async (data) => {
        try {
          const response = await axios.post("/api/supplier", data);
          const newSupplier = response.data;
          console.log("Store supplier Add Response", newSupplier);

          set((state) => ({
            suppliers: state.suppliers
              ? [...state.suppliers, newSupplier]
              : [newSupplier],
          }));
        } catch (error) {
          console.error("Failed to add supplier:", error);
        }
      },
    }),
    {
      name: "supplier-storage",
    }
  )
);
