import React from "react";
import { Header } from "./components/Header.js";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { burningManDates, yearDefault } from "./dateFunctions.js";
import { BurnWeek } from "./components/BurnWeek.js";
import { dateRangeFormat } from "react-big-calendar/lib/utils/propTypes";
import { events } from "./sampleEvents";

// Playaevents!

const localizer = momentLocalizer(moment);
function App() {
  const [firstDay, lastDay] = burningManDates(yearDefault());

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
      />
    </div>
  );
}

export default App;
