import React from "react";
import { Header } from "./components/Header.js";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { burningManDates, yearDefault } from "./dateFunctions.js";
import { BurnWeek } from "./components/BurnWeek.js";

const localizer = momentLocalizer(moment);
const events = [
  {
    start: moment().toDate(),
    end: moment().add(2, "days").toDate(),
    title: "Some title",
  },
];

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
