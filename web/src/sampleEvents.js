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
    atCamp: true,
    type: "prty",
  },
  {
    start: { h: 21, m: 0 },
    end: { h: 23, m: 30 },
    days: [6],
    title: "Man Burn",
    global: true,
    location: "The Man",
    atCamp: false,
    type: "fire",
  },
  {
    start: { h: 18, m: 0 },
    end: { h: 21, m: 0 },
    days: [7],
    title: "Temple Burn",
    global: true,
    location: "The Temple",
    atCamp: false,
    type: "fire",
  },
  {
    start: { h: 11, m: 0 },
    end: { h: 12, m: 0 },
    days: [2, 3, 4, 5, 6],
    title: "HIIT Workout",
    description:
      "Join the turtles for High Intensity Interval Training. Good music, smoothies. Bring yoga mat.",
    atCamp: true,
    type: "care",
  },
  {
    start: { h: 18, m: 0 },
    end: { h: 23, m: 59 },
    days: [2, 3, 4, 5],
    title: "Your Dreams Interpreted",
    description:
      "Visit the Future Turtles straight-friendly bar to ogle our hot bartenders, and get your dreams interpreted. Unique alcoholic and non-alcoholic cocktails every night.",
    atCamp: true,
    type: "prty",
  },
  {
    start: { h: 0, m: 45 },
    end: { h: 1, m: 30 },
    days: [6],
    title: "Impossibility space",
    description:
      "Storytelling from the edge of the multiverse with director Oscar Sharp",
    atCamp: false,
    location: "The Yurt, Echo at 4:15",
    type: "perf",
  },
  {
    start: { h: 0, m: 0 },
    end: { h: 0, m: 45 },
    days: [2, 3, 4, 5, 6],
    title: "Midnight coffee",
    description: "Trying to stay awake? The turtles have you sorted.",
    atCamp: true,
    type: "food",
  },
];
