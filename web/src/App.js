import React, { useState } from "react";
import { Header } from "./components/Header.js";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { burningManDates, yearDefault } from "./dateFunctions.js";
import { BurnWeek } from "./components/BurnWeek.js";
import { events as initialEvents } from "./sampleEvents";

// Playa Events!

const localizer = momentLocalizer(moment);
function App() {
  const [events, setEvents] = useState(initialEvents);
  const [firstDay, lastDay] = burningManDates(yearDefault());

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  return (
    <div className="App">
      <Header />
      <Calendar
        localizer={localizer}
        defaultDate={firstDay}
        defaultView={Views.WEEK}
        events={events}
        style={{ height: "100vh" }}
        views={{ agenda: true, week: BurnWeek }}
        selectable
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </div>
  );
}

export default App;
