import React, { useState } from "react";
import { Header } from "./components/Header.js";

import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import moment from "moment";
import { burningManDates, yearDefault } from "./dateFunctions.js";
import { BurnWeek } from "./components/BurnWeek.js";
import { events as initialEvents } from "./sampleEvents";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";

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
  const [firstDay, lastDay] = burningManDates(yearDefault());

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title) {
      setEvents([...events, { start, end, title, id: identity++ }]);
    }
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

    setEvents(
      events.map((i) => {
        return i.id === event.id ? { ...i, start, end, allDay: !!isAllDay } : i;
      })
    );
  };

  return (
    <div className="App">
      <Header />
      <DraggableCalendar
        localizer={localizer}
        defaultDate={firstDay}
        defaultView={Views.WEEK}
        events={events}
        style={{ height: "100vh" }}
        views={{ agenda: true, week: BurnWeek }}
        selectable
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
        showMultiDayTimes
        onEventDrop={moveEvent}
        onEventResize={moveEvent}
      />
    </div>
  );
}

export default App;
