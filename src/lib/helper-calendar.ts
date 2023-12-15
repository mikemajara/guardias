import { User } from "@/store/types";
import { Restrictions } from "@/store/use-config-calendar-store";

import { dayOfWeekToNumber, dayOfWeekToString } from "./helper-dates";

export type Assignment = {
  name: string;
  email: string;
  date: string;
  color?: string;
};

export function assignCalendarDays(
  people: User[],
  startDate: string,
  daysToAssign: number,
  restrictions: Restrictions
): Assignment[] {
  const assignments: Assignment[] = [];
  const start = new Date(startDate);
  const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);

  const allDates: Date[] = initializeAllDates(start, end);
  const dateAssignments: Map<string, number> = new Map();

  for (const person of people) {
    assignDatesForPerson(
      person,
      daysToAssign,
      allDates,
      dateAssignments,
      assignments,
      restrictions
    );
  }

  return assignments;
}

function initializeAllDates(start: Date, end: Date): Date[] {
  const allDates: Date[] = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    allDates.push(new Date(d));
  }
  return allDates;
}

function assignDatesForPerson(
  person: User,
  daysToAssign: number,
  allDates: Date[],
  dateAssignments: Map<string, number>,
  assignments: Assignment[],
  restrictions: Restrictions
) {
  const assignedDates: Date[] = [];

  while (assignedDates.length < daysToAssign) {
    let availableDates = filterAvailableDates(
      allDates,
      assignedDates,
      dateAssignments,
      restrictions
    );

    if (availableDates.length === 0) break;

    const randomIndex = Math.floor(Math.random() * availableDates.length);
    const randomDate = availableDates[randomIndex];

    assignments.push({
      name: person.name,
      email: person.email,
      date: randomDate.toISOString().split("T")[0],
      color: person.color,
    });

    assignedDates.push(randomDate);
    dateAssignments.set(
      randomDate.toISOString().split("T")[0],
      (dateAssignments.get(randomDate.toISOString().split("T")[0]) || 0) + 1
    );
  }
}

function filterAvailableDates(
  allDates: Date[],
  assignedDates: Date[],
  dateAssignments: Map<string, number>,
  restrictions: Restrictions
): Date[] {
  return allDates.filter((d) => {
    const dateStr = d.toISOString().split("T")[0];

    // Check specific date restriction
    if (
      restrictions.specificDateRestriction &&
      restrictions.specificDateRestriction[dateStr] !== undefined &&
      (dateAssignments.get(dateStr) ?? 0) >=
        restrictions.specificDateRestriction[dateStr]
    ) {
      return false;
    }

    // Check general date restriction
    if (
      restrictions.dateRestriction &&
      (dateAssignments.get(dateStr) ?? 0) >=
        restrictions.dateRestriction.maxAssignmentsPerDay
    ) {
      return false;
    }

    // Check user restriction
    if (restrictions.userRestriction) {
      const minGap = restrictions.userRestriction.minDaysBetweenAssignments;
      if (
        assignedDates.some(
          (assignedDate) =>
            Math.abs(d.getTime() - assignedDate.getTime()) <= minGap * 86400000
        )
      ) {
        return false;
      }
    }

    return true;
  });
}

function updateMandatoryDaysCovered(
  assignedDates: Date[],
  restrictions: Restrictions
): boolean {
  if (
    !restrictions.mandatoryDayRestrictions ||
    restrictions.mandatoryDayRestrictions.length === 0
  ) {
    return true;
  }

  return restrictions.mandatoryDayRestrictions.every((restriction) => {
    return restriction.mandatoryDays.some((day) =>
      assignedDates.some(
        (assignedDate) => assignedDate.getDay() === dayOfWeekToNumber(day)
      )
    );
  });
}
