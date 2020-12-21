import 'react-big-calendar/lib/css/react-big-calendar.css';

import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);
const events = [
  {
    start: moment().toDate(),
    end: moment()
      .add(2, "days")
      .toDate(),
    title: "Some title"
  }
];

const App = () => {

      return (
      <div className="App">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
          events={events}
          style={{ height: "100vh" }}
        />
      </div>
    );
  
};

export default App;
