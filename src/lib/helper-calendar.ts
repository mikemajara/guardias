import { User } from "@/store/types";
import { Restrictions } from "@/store/use-config-calendar-store";

import { dayOfWeekToNumber, dayOfWeekToString } from "./helper-dates";

export type Assignment = {
  name: string;
  email: string;
  date: string;
  color?: string;
};

/**
 * Assigns dates to a list of people in a round-robin fashion based on availability and defined restrictions.
 * Generates assignments for each person for a specified number of days within a given date range.
 *
 * @param {User[]} people - An array of users to whom dates will be assigned.
 * @param {string} startDate - The starting date of the assignment period.
 * @param {number} daysToAssign - The number of days each person is to be assigned.
 * @param {Restrictions} restrictions - Rules that govern how dates are assigned.
 * @returns {Assignment[]} An array of assignments for each person.
 */
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

  const peopleAssignments: Map<User, Date[]> = new Map(
    people.map((person) => [person, []])
  );

  for (let i = 0; i < daysToAssign; i++) {
    for (const person of people) {
      const assignedDates = peopleAssignments.get(person);

      let availableDates = filterAvailableDates(
        allDates,
        assignedDates ?? [],
        dateAssignments,
        restrictions
      );

      if (availableDates.length === 0) continue;

      const randomIndex = Math.floor(Math.random() * availableDates.length);
      const randomDate = availableDates[randomIndex];

      assignments.push({
        name: person.name,
        email: person.email,
        date: randomDate.toISOString().split("T")[0],
        color: person.color,
      });

      assignedDates?.push(randomDate);
      dateAssignments.set(
        randomDate.toISOString().split("T")[0],
        (dateAssignments.get(randomDate.toISOString().split("T")[0]) || 0) + 1
      );
    }
  }

  return assignments;
}

/**
 * Generates an array of dates between a start and an end date, inclusive.
 * Each date in the range is added to the array as a distinct `Date` object.
 *
 * @param {Date} start - The start date of the range.
 * @param {Date} end - The end date of the range.
 * @returns {Date[]} An array of dates from start to end, inclusive.
 */
function initializeAllDates(start: Date, end: Date): Date[] {
  const allDates: Date[] = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    allDates.push(new Date(d));
  }
  return allDates;
}

/**
 * Assigns dates to a specific person based on availability and restrictions.
 * The function selects dates randomly from available dates that meet the restrictions
 * and updates the assignments and date assignments accordingly.
 *
 * @param {User} person - The person to whom dates are being assigned.
 * @param {number} daysToAssign - The number of dates to assign to the person.
 * @param {Date[]} allDates - Array of all potential dates for assignment.
 * @param {Map<string, number>} dateAssignments - Tracks the count of assignments per date.
 * @param {Assignment[]} assignments - The array to which new assignments are added.
 * @param {Restrictions} restrictions - The set of rules defining assignment constraints.
 */
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

/**
 * Filters dates from a given array based on specific, general, and user restrictions.
 * It evaluates each date against these restrictions to determine if it's available for assignment.
 *
 * @param {Date[]} allDates - An array of all dates to consider for assignment.
 * @param {Date[]} assignedDates - Dates already assigned to a specific user.
 * @param {Map<string, number>} dateAssignments - A map tracking the number of assignments per date.
 * @param {Restrictions} restrictions - The set of rules defining date and user restrictions.
 * @returns {Date[]} An array of dates that meet the specified restrictions.
 */

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

/**
 * Checks if all mandatory day restrictions have been met based on the assigned dates.
 * Returns true if each mandatory day has at least one corresponding assigned date.
 *
 * @param {Date[]} assignedDates - The dates that have been assigned to a user.
 * @param {Restrictions} restrictions - The set of rules, including mandatory day restrictions.
 * @returns {boolean} True if all mandatory day restrictions are covered, otherwise false.
 */
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
