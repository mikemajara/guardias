import { v4 as uuidv4 } from "uuid";
// useUserStore.ts
import { create } from "zustand";

import { User } from "./types"; // Import the User type

type UserState = {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (email: string) => void;
  // Other actions you might need
};

export const useUserStore = create<UserState>((set) => ({
  users: [],

  addUser: (user) =>
    set((state) =>
      !state.users.map((u) => u.email).includes(user.email)
        ? {
            users: [...state.users, { ...user, id: uuidv4() }],
          }
        : state
    ),

  removeUser: (id: string) =>
    set((state) => ({ users: state.users.filter((user) => user.id !== id) })),

  // Implement other actions (like updateUser, etc.) here if needed
}));
