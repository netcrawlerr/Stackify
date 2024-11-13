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
  updateSupplier: (data: Suppliers) => Promise<void>;
  deleteSupplier: (id: number) => Promise<void>;
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
      updateSupplier: async (data) => {
        try {
          const response = await axios.put(`/api/supplier/${data.id}`, data);
          const updatedSupplier = response.data;
          console.log("Store supplier Updated Response:", updatedSupplier);
          set((state) => ({
            suppliers: state.suppliers
              ? state.suppliers.map((supplier) =>
                  supplier.id === updatedSupplier.id
                    ? updatedSupplier
                    : supplier
                )
              : [updatedSupplier],
          }));
        } catch (error) {
          console.error("Failed to update supplier:", error);
        }
      },

      deleteSupplier: async (id) => {
        try {
          await axios.delete(`/api/supplier/${id}`);
          console.log(`Supplier with ID ${id} deleted`);

          set((state) => ({
            suppliers: state.suppliers
              ? state.suppliers.filter((supplier) => supplier.id !== id)
              : null,
          }));
        } catch (error) {
          console.error(`Failed to delete supplier with ID ${id}:`, error);
        }
      },
    }),

    {
      name: "supplier-storage",
    }
  )
);
