import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import axios from "axios";
import { createReadStream } from "fs";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
import { IUser } from "../utils/types";

interface IPost {
  userProfile: IUser | null;
  addUser: (user: IUser) => void;
  removeUser: (user: IUser) => void;
  fetchAllUsers: (user: IUser) => void;
}

interface AuthStore {
  userProfile: IUser | null;
  setUser: (user: IUser | null) =>void;
  removeUser: () =>void;
}


const useAuthStore = create<AuthStore>()(
  devtools(
    persist((set) => ({
      userProfile: null,
      setUser: (user: IUser | null) => set({ userProfile: user }),
      removeUser: () => set({ userProfile: null }),
    }))
  )
);

// const useAuthStore = create(
//   persist(authStore, {
//     name: "auth",
//   })
// );

export default useAuthStore;
