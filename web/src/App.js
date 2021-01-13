import React, { useState } from "react";

import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";

import { Header } from "./components/Header.js";

import moment from "moment";

import { burningManDates, yearDefault } from "./dateFunctions.js";
import { BurnWeek } from "./components/BurnWeek.js";
import { initialRawEvents } from "./sampleEvents";
import { EventDialog } from "./components/EventDialog";

// Playa Events!

const localizer = momentLocalizer(moment);
const DraggableCalendar = withDragAndDrop(Calendar);
const [firstDay] = burningManDates(yearDefault());

// At startup, assign each raw event an id that can be
// used to find it later.
//
let identity = 0;
initialRawEvents.forEach((e) => {
  e.id = identity++;
});

// Convert rawEvents to calEvents
//
// rawEvents format looks like this:
//
// {
//   start: { h: 20, m: 0 },
//   end: { h: 2, m: 0 },
//   days: [1,2,4],
//   title: "Party",
//   description:
//     "Future Turtles Party",
// }
//
// This function:
//
// - explodes multi-day events into several separate events (in the example above, there are three instances of the event)
// - convert the start and end times to actual Dates
//
const CalEventsFromRawEvents = (rawEvents) => {
  let calEvents = [];

  rawEvents.forEach((e) => {
    e.days.forEach((d) => {
      calEvents.push({
        start: moment(firstDay)
          .add(d, "days")
          .add(e.start.h, "hours")
          .add(e.start.m, "minutes")
          .toDate(),
        end: moment(firstDay)
          .add(d + (e.end.h < e.start.h ? 1 : 0), "days")
          .add(e.end.h, "hours")
          .add(e.end.m, "minutes")
          .toDate(),
        title: e.title,
        id: e.id, // multiple calendar events may point to same raw event
        global: e.global,
      });
    });
  });

  return calEvents;
};

function App() {
  const [rawEvents, setRawEvents] = useState(initialRawEvents);
  const [showPopup, setShowPopup] = useState(false);
  const [eventForPopup, setEventForPopup] = useState({});
  const [editing, setEditing] = useState(false);

  const newEventFromGrid = ({ start, end }) => {
    const newEvent = {
      start: { h: start.getHours(), m: start.getMinutes() },
      end: { h: end.getHours(), m: end.getMinutes() },
      days: [moment(start).diff(firstDay, "days")],
      title: "New event",
      id: identity++,
    };

    setRawEvents([...rawEvents, newEvent]);
    setEventForPopup(newEvent);
    setShowPopup(true);
    setEditing(true);
  };

  const drillDown = (event) => {
    setEventForPopup(rawEvents.find((e) => e.id === event.id));
    setShowPopup(true);
    setEditing(false);
  };

  const closeDrillDown = () => {
    setShowPopup(false);
  };

  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  const moveEvent = ({ event, start, end, isAllDay }) => {
    if (!isValidDate(start) || !isValidDate(end)) {
      // the resizing code can corrupt the new start date when events cross midnight
      // https://github.com/jquense/react-big-calendar/issues/1598
      return;
    }

    if (event.global) {
      // are you trying to change the time of the man burn? good luck with that buddy
      return;
    }

    setRawEvents(
      rawEvents.map((e) => {
        if (e.id === event.id) {
          let newDays = e.days;

          // only single-day events can be moved date-wise
          // otherwise you gotta use the dialog
          if (newDays.length === 1) {
            newDays[0] = moment(start).diff(moment(firstDay), "days");
          }

          return {
            ...e,
            start: { h: start.getHours(), m: start.getMinutes() },
            end: { h: end.getHours(), m: end.getMinutes() },
            days: newDays,
          };
        } else {
          return e;
        }
      })
    );
  };

  const saveEvent = (rawEvent) => {
    setRawEvents(
      rawEvents.map((e) => {
        if (e.id === rawEvent.id) {
          return rawEvent;
        } else {
          return e;
        }
      })
    );
  };

  const deleteEvent = (rawEventId) => {
    setRawEvents(rawEvents.filter((x) => x.id !== rawEventId));
  };

  const formatEvent = (event, start, end, isSelected) => {
    return {
      style: {
        backgroundColor: event.global ? "#E4DDCD" : "#1A5084",
        color: event.global ? "black" : "white",
        fontSize: "0.8rem",
        fontWeight: 600,
        opacity: 0.8,
      },
    };
  };

  return (
    <div className="App">
      <Header />
      <EventDialog
        show={showPopup}
        close={closeDrillDown}
        event={eventForPopup}
        saveEvent={saveEvent}
        deleteEvent={deleteEvent}
        editing={editing}
        setEditing={setEditing}
      />
      <DraggableCalendar
        localizer={localizer}
        defaultDate={firstDay}
        defaultView={Views.WEEK}
        events={CalEventsFromRawEvents(rawEvents)}
        style={{ height: "100vh" }}
        views={{ agenda: true, week: BurnWeek }}
        formats={{
          timeGutterFormat: (date) => moment(date).format("ha"),
          dayFormat: (date) => moment(date).format("ddd, MMM D"),
          eventTimeRangeFormat: ({ start, end }) =>
            moment(start).format("h:mma"),
          eventTimeRangeStartFormat: ({ start, end }) =>
            moment(start).format("h:mma"),
          eventTimeRangeEndFormat: ({ start, end }) =>
            moment(end).format("—h:mma"),
          selectRangeFormat: ({ start, end }) =>
            moment(start).format("h:mma—") + moment(end).format("h:mma"),
        }}
        selectable
        onSelectEvent={drillDown}
        onSelectSlot={newEventFromGrid}
        showMultiDayTimes
        onEventDrop={moveEvent}
        onEventResize={moveEvent}
        eventPropGetter={formatEvent}
      />
    </div>
  );
}

export default App;
