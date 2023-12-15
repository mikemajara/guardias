import create from "zustand";

interface UserRestriction {
  minDaysBetweenAssignments: number;
}

interface DateRestriction {
  maxAssignmentsPerDay: number;
}

interface SpecificDateRestriction {
  [date: string]: number;
}

export type Restrictions = {
  userRestriction?: UserRestriction;
  dateRestriction?: DateRestriction;
  specificDateRestriction?: SpecificDateRestriction;
};

interface ConfigCalendarStore {
  restrictions: Restrictions;
  setUserRestriction: (userRestriction: UserRestriction) => void;
  setDateRestriction: (dateRestriction: DateRestriction) => void;
  addSpecificDateRestriction: (date: string, restriction: number) => void;
}

export const useConfigCalendarStore = create<ConfigCalendarStore>((set) => ({
  restrictions: {},
  setUserRestriction: (userRestriction: UserRestriction) =>
    set((state) => ({
      restrictions: {
        ...state.restrictions,
        userRestriction,
      },
    })),
  setDateRestriction: (dateRestriction: DateRestriction) =>
    set((state) => ({
      restrictions: {
        ...state.restrictions,
        dateRestriction,
      },
    })),
  addSpecificDateRestriction: (date: string, restriction: number) =>
    set((state) => ({
      restrictions: {
        ...state.restrictions,
        specificDateRestriction: {
          ...state.restrictions.specificDateRestriction,
          [date]: restriction,
        },
      },
    })),
}));
