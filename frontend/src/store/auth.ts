import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

type User = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  username: string;
  email: string;
  name: string;
  role: "admin" | "manager" | "staff";
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    username: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (username: string, password: string) => {
        // API call
        console.log("reere");
        try {
          const response = await axios.post("/api/account/login", {
            userName: username,
            password: password,
          });

          const { firstName, lastName, userName, email, token } = response.data;

          const user = {
            firstName: firstName,
            lastName: lastName,
            username: userName,
            email: email,
            token: token,
          };
          set({ user: user, token: token, isAuthenticated: true });
        } catch (error) {
          console.error("Login error: cathed");
          throw new Error();
        }
      },
      register: async (
        firstName: string,
        lastName: string,
        email: string,
        phoneNumber,
        username: string,
        password: string
      ) => {
        try {
          const response = await axios.post("/api/account/register", {
            firstName: firstName,
            lastName: lastName,
            userName: username,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
          });
          console.log(response.data);
        } catch (error) {
          if (error.response && error.response.data) {
            const errorMessages = error.response.data
              .map((err) => err.description)
              .join("\n");
            throw new Error(errorMessages);
          } else {
            throw new Error("An unexpected error occurred."); //
          }
        }
      },
      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
