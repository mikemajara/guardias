type Assignment = {
  name: string;
  email: string;
  date: string;
};

export function assignCalendarDays(
  people: { name: string; email: string }[],
  startDate: string,
  daysToAssign: number
): Assignment[] {
  const assignments: Assignment[] = [];
  const date = new Date(startDate);

  for (let i = 0; i < daysToAssign; i++) {
    for (const person of people) {
      assignments.push({
        name: person.name,
        email: person.email,
        date: date.toISOString().split("T")[0],
      });

      // Increment the date by one day
      date.setDate(date.getDate() + 1);
    }
  }

  return assignments;
}
