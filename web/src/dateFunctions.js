import * as dateMath from "date-arithmetic";

// From December onwards, show next years' Burning Man
export function yearDefault() {
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
export function burningManDates(yyyy) {
  const lastDay = laborDayForYear(yyyy);
  let firstDay = dateMath.add(lastDay, -8, "day");
  return [firstDay, lastDay];
}
