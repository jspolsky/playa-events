import React, { useState } from "react";

import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";

import { Header } from "./components/Header.js";

import moment from "moment";

import { burningManDates, yearDefault } from "./dateFunctions.js";
import { BurnWeek } from "./components/BurnWeek.js";
import { events as initialEvents } from "./sampleEvents";
import { EventDialog } from "./components/EventDialog";

// Playa Events!

const localizer = momentLocalizer(moment);
const DraggableCalendar = withDragAndDrop(Calendar);

// Give each event a unique identity so we can identify them
// later in drag and drops
var identity = 0;
const eventsWithIDs = initialEvents.map((x) => {
  return { ...x, id: identity++ };
});

function App() {
  const [events, setEvents] = useState(eventsWithIDs);
  const [showPopup, setShowPopup] = useState(false);
  const [eventForPopup, setEventForPopup] = useState({});
  const [firstDay] = burningManDates(yearDefault());

  const newEventFromGrid = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title) {
      setEvents([...events, { start, end, title, id: identity++ }]);
    }
  };

  const drillDown = (event) => {
    setEventForPopup(event);
    setShowPopup(true);
  };

  const closeDrillDown = () => {
    setShowPopup(false);
  };

  function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
  }

  const moveEvent = ({ event, start, end, isAllDay }) => {
    if (!isValidDate(start) || !isValidDate(end)) {
      // the resizing code corrupts the new start date when events cross midnight
      // https://github.com/jquense/react-big-calendar/issues/1598
      return;
    }

    if (event.global) {
      // are you trying to change the time of the man burn? good luck with that buddy
      return;
    }

    setEvents(
      events.map((i) => {
        return i.id === event.id ? { ...i, start, end, allDay: !!isAllDay } : i;
      })
    );
  };

  const formatEvent = (event, start, end, isSelected) => {
    if (event.global)
      return {
        // note: you could be setting className instead of style here and that would be probably better
        style: {
          backgroundColor: isSelected ? "tan" : "cornsilk",
          color: "black",
        },
      };
    return {};
  };

  return (
    <div className="App">
      <Header />
      <EventDialog
        show={showPopup}
        close={closeDrillDown}
        event={eventForPopup}
      />
      <DraggableCalendar
        localizer={localizer}
        defaultDate={firstDay}
        defaultView={Views.WEEK}
        events={events}
        style={{ height: "100vh" }}
        views={{ agenda: true, week: BurnWeek }}
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
