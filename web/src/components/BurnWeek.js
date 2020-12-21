// A custom view for the calendar that shows 9 days

import React from "react";

import * as dateMath from "date-arithmetic";
import TimeGrid from "react-big-calendar/lib/TimeGrid";

export class BurnWeek extends React.Component {
  render() {
    let { date } = this.props;
    let range = BurnWeek.range(date);

    return <TimeGrid {...this.props} range={range} eventOffset={15} />;
  }
}

BurnWeek.range = (date) => {
  let start = date;
  let end = dateMath.add(start, 8, "day");

  let current = start;
  let range = [];

  while (dateMath.lte(current, end, "day")) {
    range.push(current);
    current = dateMath.add(current, 1, "day");
  }

  return range;
};

// Navigating to previous/next week is not allowed. All events have to be
// during BurnWeek.
BurnWeek.navigate = (date, action) => {
  return date;
};

BurnWeek.title = (date) => {
  return `Burn Week ${date.getFullYear()}`;
};
