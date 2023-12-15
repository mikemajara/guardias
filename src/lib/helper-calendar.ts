type Assignment = {
  name: string;
  email: string;
  date: string;
};

interface UserRestriction {
  minDaysBetweenAssignments: number;
}

interface DateRestriction {
  maxAssignmentsPerDay: number;
}

type Restrictions = {
  userRestriction?: UserRestriction;
  dateRestriction?: DateRestriction;
};

export function assignCalendarDays(
  people: { name: string; email: string }[],
  startDate: string,
  daysToAssign: number,
  restrictions?: Restrictions
): Assignment[] {
  const assignments: Assignment[] = [];
  const start = new Date(startDate);
  const end = new Date(start.getFullYear(), start.getMonth() + 1, 0); // Last day of the month

  const allDates: Date[] = [];
  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    allDates.push(new Date(d));
  }

  const dateAssignments: Map<string, number> = new Map(); // Track assignments per date

  for (const person of people) {
    const assignedDates: Date[] = [];

    for (let i = 0; i < daysToAssign; ) {
      let availableDates = allDates.filter((d) => {
        const dateStr = d.toISOString().split("T")[0];

        // Check user restriction
        if (restrictions?.userRestriction) {
          const minGap = restrictions.userRestriction.minDaysBetweenAssignments;
          if (
            assignedDates.some(
              (assignedDate) =>
                Math.abs(d.getTime() - assignedDate.getTime()) <=
                minGap * 86400000
            )
          ) {
            return false;
          }
        }

        // Check date restriction
        if (
          restrictions?.dateRestriction &&
          (dateAssignments.get(dateStr) ?? 0) >=
            restrictions.dateRestriction.maxAssignmentsPerDay
        ) {
          return false;
        }

        return true;
      });

      if (availableDates.length === 0) break; // If no more dates are available

      const randomIndex = Math.floor(Math.random() * availableDates.length);
      const randomDate = availableDates[randomIndex];

      assignments.push({
        name: person.name,
        email: person.email,
        date: randomDate.toISOString().split("T")[0],
      });

      assignedDates.push(randomDate);
      dateAssignments.set(
        randomDate.toISOString().split("T")[0],
        (dateAssignments.get(randomDate.toISOString().split("T")[0]) || 0) + 1
      );

      i++;
    }
  }

  return assignments;
}
