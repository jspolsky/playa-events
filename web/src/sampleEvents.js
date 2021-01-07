// This format is "rawEvents" which represents the
// actual data model of playa events, in which the same
// event can repeat on multiple days.
//
// It needs to be converted to "calEvents" format to
// be displayed on the calendar. This involves
// creating multiple events for any events that
// have more than one occurrance, and converting the
// date/time format to normal start/end times.

export const initialRawEvents = [
  {
    start: { h: 20, m: 0 },
    end: { h: 2, m: 0 },
    days: [1],
    title: "East Village Shirtless Dance Party",
    description:
      "Future Turtles invites you to our opening night bash. Cosmos, dance music, and hot bartenders",
  },
  {
    start: { h: 21, m: 0 },
    end: { h: 23, m: 30 },
    days: [6],
    title: "Man Burn",
    global: true,
  },
  {
    start: { h: 18, m: 0 },
    end: { h: 21, m: 0 },
    days: [7],
    title: "Temple Burn",
    global: true,
  },
  {
    start: { h: 11, m: 0 },
    end: { h: 12, m: 0 },
    days: [2, 3, 4, 5, 6],
    title: "HIIT Workout",
    description:
      "Join the turtles for High Intensity Interval Training. Good music, smoothies. Bring yoga mat.",
  },
];
