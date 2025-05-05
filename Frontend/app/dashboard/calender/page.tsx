"use client";
// Libraries Imports
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { getDay, startOfWeek, parse, format } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";

interface CalendarEvent {
  title: string;
  start: Date;
  end: Date;
  type: "invoice" | "transaction";
  amount?: number;
  id?: string;
}

// Setup locales
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function Calender() {
  const events: CalendarEvent[] = [
    {
      title: "Invoice #INV-1001",
      start: new Date(2025, 4, 7),
      end: new Date(2025, 4, 7),
      type: "invoice",
      amount: 500,
    },
    {
      title: "Transaction - Grocery",
      start: new Date(2025, 4, 10),
      end: new Date(2025, 4, 10),
      type: "transaction",
      amount: 100,
    },
  ];

  return (
    <div className="h-screen px-4 lg:px-6">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month"]}
        defaultView="month"
        selectable
        eventPropGetter={(event) => {
          const backgroundColor =
            event.type === "invoice" ? "#1D4ED8" : "#059669";
          return {
            style: {
              backgroundColor,
              color: "white",
              borderRadius: "4px",
            },
          };
        }}
        onSelectEvent={(event) => alert(`${event.title} - $${event.amount}`)}
        style={{ height: "100%" }}
      />
    </div>
  );
}

export default Calender;
