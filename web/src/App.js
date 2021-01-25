import React, { useState } from "react";

import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

import { Header } from "./components/Header.js";

import moment from "moment";

import { burningManDates, yearDefault } from "./dateFunctions.js";
import { BurnWeek } from "./components/BurnWeek.js";
import { initialRawEvents } from "./sampleEvents";
import { EventDialog } from "./components/EventDialog";
import { CheckEvent } from "./components/CheckEvent.js";

export const sum = (a, b) => {
  return a + b;
};

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
export const CalEventsFromRawEvents = (rawEvents) => {
  let calEvents = [];

  rawEvents.forEach((e) => {
    e.eventError = CheckEvent(e);

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
        eventError: e.eventError,
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
  const [globalError, setGlobalError] = useState(false);
  const [dblClickTimer, setDblClickTimer] = useState(null);

  const newEventTemplate = {
    title: "New event",
    type: "othr",
    atCamp: true,
    locationType: "other",
    newEvent: true, // this makes it so that a "cancel" doesn't save
    eventError: false,
    description: "",
    url: "",
  };

  const newEventFromGrid = ({ start, end }) => {
    const newEvent = {
      ...newEventTemplate,
      start: { h: start.getHours(), m: start.getMinutes() },
      end: { h: end.getHours(), m: end.getMinutes() },
      days: [moment(start).diff(firstDay, "days")],
      id: identity++,
    };

    setRawEvents([...rawEvents, newEvent]);
    setEventForPopup(newEvent);
    setShowPopup(true);
    setEditing(true);
  };

  const handleNewEvent = () => {
    const newEvent = {
      ...newEventTemplate,
      start: { h: 12, m: 0 },
      end: { h: 14, m: 0 },
      days: [1],
      id: identity++,
    };

    setRawEvents([...rawEvents, newEvent]);
    setEventForPopup(newEvent);
    setShowPopup(true);
    setEditing(true);
  };

  const drillDown = (event) => {
    // single click - show the event in static mode
    // double click - show the event for editing

    setEventForPopup(rawEvents.find((e) => e.id === event.id));
    setEditing(false);

    if (dblClickTimer) {
      clearTimeout(dblClickTimer);
      setDblClickTimer(null);
      setEditing(!eventForPopup.global); // but you can never edit global events
    }

    setDblClickTimer(
      setTimeout(() => {
        setShowPopup(true);
        setDblClickTimer(null);
      }, 200)
    );
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

          const result = {
            ...e,
            start: { h: start.getHours(), m: start.getMinutes() },
            end: { h: end.getHours(), m: end.getMinutes() },
            days: newDays,
          };

          setGlobalError(CheckEvent(result));

          return result;
        } else {
          return e;
        }
      })
    );
  };

  const saveEvent = (rawEvent) => {
    setGlobalError(CheckEvent(rawEvent));

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
    setGlobalError(false);
  };

  const formatEvent = (event, start, end, isSelected) => {
    let bgColor = "#00203F";
    if (event.global) {
      bgColor = "#E4DDCD";
    }
    if (event.eventError) {
      bgColor = "#DC4156";
    }

    return {
      style: {
        backgroundColor: bgColor,
        color: event.global ? "black" : "white",
        fontSize: "0.8rem",
        fontWeight: 500,
        opacity: 0.7,
      },
    };
  };

  return (
    <div className="App">
      <Snackbar open={globalError !== false}>
        <Alert severity="error" elevation={6} variant="filled">
          {globalError}
        </Alert>
      </Snackbar>
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
        components={{
          event: ({ event }) => {
            return (
              <span>
                {!!event.eventError ? "⚠️ " : ""}
                {event.title}
              </span>
            );
          },
          toolbar: (props) => {
            return (
              <Header title={props.label} handleNewEvent={handleNewEvent} />
            );
          },
        }}
      />
    </div>
  );
}

export default App;
