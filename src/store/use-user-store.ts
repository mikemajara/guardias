import { difference, sample } from "lodash";
import { v4 as uuidv4 } from "uuid";
// useUserStore.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { User } from "./types"; // Import the User type

type Color =
  | "gray"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "blue"
  | "cyan"
  | "purple"
  | "pink";

type UserState = {
  users: User[];
  addUser: (user: User) => void;
  removeUser: (email: string) => void;
  // Other actions you might need
};

const colors: Color[] = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
];

export const useUserStore = create(
  persist<UserState>(
    (set) => ({
      users: [],

      addUser: (user) =>
        set((state) => {
          if (!state.users.map((u) => u.email).includes(user.email)) {
            let newColor = sample(
              difference(
                colors,
                state.users.map((e) => e.color)
              )
            );
            return {
              users: [
                ...state.users,
                { ...user, id: uuidv4(), color: newColor },
              ],
            };
          } else return state;
        }),

      removeUser: (id: string) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        })),

      // Implement other actions (like updateUser, etc.) here if needed
    }),
    { name: "users" }
  )
);
