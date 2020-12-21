import React from "react";
import { Header } from "./components/Header.js";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

// From December onwards, show next years' Burning Man
function yearDefault() {
  const today = new Date();
  return today.getFullYear() + (today.getMonth() > 10 ? 1 : 0);
}

// Labor day is first Monday in September.
function laborDayForYear(yyyy) {
  // reminder - JavaScript months are 0-11

  const sept1 = new Date(yyyy, 8, 1);
  const sept1dow = sept1.getDay(); // 0 = sunday
  const laborDay = ((8 - sept1dow) % 7) + 1;

  return new Date(yyyy, 8, laborDay);
}

// Burning Man is 8 days ending on Labor Day
function burningManDates(yyyy) {
  const lastDay = laborDayForYear(yyyy);
  let firstDay = new Date(lastDay);
  firstDay.setDate(firstDay.getDate() - 8);
  return [firstDay, lastDay];
}

const localizer = momentLocalizer(moment);
const events = [
  {
    start: moment().toDate(),
    end: moment().add(2, "days").toDate(),
    title: "Some title",
  },
];

function App() {
  const [firstDay, lastDay] = burningManDates(yearDefault);

  return (
    <div className="App">
      <Header />
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="week"
        events={events}
        style={{ height: "100vh" }}
      />
    </div>
  );
}

export default App;
