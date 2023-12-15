import create from "zustand";

export type DayOfWeek =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

interface UserRestriction {
  minDaysBetweenAssignments: number;
}

interface DateRestriction {
  maxAssignmentsPerDay: number;
}

interface SpecificDateRestriction {
  [date: string]: number;
}

interface MandatoryDayRestriction {
  mandatoryDays: DayOfWeek[]; // Days where at least one assignment is required
}

export type Restrictions = {
  userRestriction?: UserRestriction;
  dateRestriction?: DateRestriction;
  specificDateRestriction?: SpecificDateRestriction;
  mandatoryDayRestrictions?: MandatoryDayRestriction[];
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
