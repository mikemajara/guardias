// types.ts
export type User = {
  id?: string;
  name: string;
  email: string;
  level?: number;
  assignedDates?: Date[];
};