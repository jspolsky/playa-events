/**
 * Checks if an event has any obvious errors that will cause it to be rejected
 *
 * @param {Object} e the event (raw event format)
 * @return {(string | false)} false if event is OK, otherwise a string error message
 */
export const CheckEvent = (e) => {
  let { start, end, days, title, description } = e;

  if (end.h < start.h) {
    // event wraps past midnight
    end = { h: end.h + 24, m: end.m };
  }
  const durationInMinutes = end.h * 60 + end.m - (start.h * 60 + start.m);

  if (days[0] === 0 && start.h < 18) {
    return "Events on opening day cannot start before 6:00pm";
  }

  if (days.includes(8) && end.h * 60 + end.m > 18 * 60) {
    return "Events on final day cannot go past 6:00pm";
  }

  if (durationInMinutes > 12 * 60) {
    return "Events may not be longer than 12 hours";
  }

  if (title === "New event" || title === "") {
    return "Event needs a name";
  }

  if (title.length < 3) {
    return "Event name must be at least three letters long";
  }

  if (description === "" || description === undefined) {
    return "Event must have a description";
  }

  return false;
};
