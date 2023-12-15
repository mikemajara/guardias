import { DayOfWeek } from "@/store/use-config-calendar-store";

export function getDatesInRange(startDate: string, endDate: string): string[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates: string[] = [];

  for (let d = start; d < end; d.setDate(d.getDate() + 1)) {
    dates.push(d.toISOString().split("T")[0]);
  }

  return dates;
}

export function dayOfWeekToNumber(day: DayOfWeek): number {
  // Convert DayOfWeek to JavaScript's getDay() number (0 = Sunday, 1 = Monday, ...)
  switch (day) {
    case "Sunday":
      return 0;
    case "Monday":
      return 1;
    case "Tuesday":
      return 2;
    case "Wednesday":
      return 3;
    case "Thursday":
      return 4;
    case "Friday":
      return 5;
    case "Saturday":
      return 6;
  }
}

export function dayOfWeekToString(dayNumber: number): DayOfWeek {
  // Convert JavaScript's getDay() number to DayOfWeek
  const days: DayOfWeek[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return days[dayNumber];
}
