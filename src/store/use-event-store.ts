import { create } from "zustand";
import { persist } from "zustand/middleware";

import { EventApi } from "@fullcalendar/core/index.js";

interface EventStore {
  events: EventApi[];
  addEvent: (event: EventApi) => void;
  updateEvent: (updatedEvent: EventApi) => void;
  removeEvent: (eventId: string) => void;
  setEvents: (events: EventApi[]) => void;
}

export const useEventStore = create(
  persist<EventStore>(
    (set) => ({
      events: [],
      addEvent: (event) =>
        set((state) => ({ events: [...state.events, event] })),
      updateEvent: (updatedEvent) =>
        set((state) => ({
          events: state.events.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          ),
        })),
      removeEvent: (eventId) =>
        set((state) => ({
          events: state.events.filter((event) => event.id !== eventId),
        })),
      setEvents: (events) => set({ events }),
    }),
    { name: "events" }
  )
);
