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
      "Future Turtles invites you to our opening night bash. Cosmos, dance music, hugs and friendly bartenders.",
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
    title: "Lazy workout",
    description:
      "Join the turtles for High Intensity Interval Training, only we're super lazy so it won't be that high intensity. Good music, smoothies. Bring yoga mat.",
    atCamp: true,
    type: "care",
  },
  {
    start: { h: 18, m: 0 },
    end: { h: 23, m: 59 },
    days: [2, 4],
    title: "Your Dreams Interpreted",
    description:
      "Visit the Future Turtles straight-friendly bar to ogle our hot bartenders, and get your dreams interpreted. Unique alcoholic and non-alcoholic cocktails every night.",
    atCamp: true,
    type: "prty",
  },
  {
    start: { h: 18, m: 0 },
    end: { h: 23, m: 59 },
    days: [3],
    title: "Cook yer sausage",
    description:
      "Visit the Future Turtles straight-friendly bar to ogle our hot bartenders, and cook your sausage in our deep boiling pots of fragrant water. BRING YOUR OWN SAUSAGE. (If you have a cow, you can make sausage at Farm Camp, Esplanade and 6:15). Unique alcoholic and non-alcoholic cocktails every night.",
    atCamp: true,
    type: "food",
  },
  {
    start: { h: 16, m: 0 },
    end: { h: 18, m: 0 },
    days: [4],
    title: "Billion Bunny March",
    description:
      "Come over to the bunny side. Hop. Wiggle your tail. Deliver colorful eggs and support a universal campaign of fluffy goodness for all. NO CARROTS",
    atCamp: false,
    location:
      "Meet at Center Camp; march will proceed to the Man at 4:30 sharp",
    type: "para",
  },
  {
    start: { h: 18, m: 0 },
    end: { h: 23, m: 59 },
    days: [5],
    title: "AP Calculus Study Group",
    description:
      "Trying to get a leg up before school resumes next week? Our expert instructors will cover the most important parts of Leibniz's amazing invention. Unique alcoholic and non-alcoholic cocktails will be served.",
    atCamp: true,
    type: "work",
  },

  {
    start: { h: 0, m: 45 },
    end: { h: 2, m: 0 },
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
