import { CheckEvent } from "./CheckEvent.js";
import { initialRawEvents } from "../sampleEvents.js";

// everything in initialRawEvents is an example of a good event
//
test.each(initialRawEvents)("Check initialRawEvents %o", (e) => {
  expect(CheckEvent(e)).toBe(false);
});

const otherEvents = [
  [
    {
      start: { h: 17, m: 59 },
      end: { h: 2, m: 0 },
      days: [0],
      title: "invalid sunday event starting before 6:00pm",
      description: "NA",
      atCamp: true,
      type: "prty",
    },
    "Events on opening day cannot start before 6:00pm",
  ],
  [
    {
      start: { h: 17, m: 59 },
      end: { h: 2, m: 0 },
      days: [0, 1, 4, 5],
      title: "invalid sunday event starting before 6:00pm",
      description: "NA",
      atCamp: true,
      type: "prty",
    },
    "Events on opening day cannot start before 6:00pm",
  ],
  [
    {
      start: { h: 14, m: 0 },
      end: { h: 18, m: 1 },
      days: [8],
      title: "invalid final day event ending after 6:00pm",
      description: "NA",
      atCamp: true,
      type: "prty",
    },
    "Events on final day cannot go past 6:00pm",
  ],
  [
    {
      start: { h: 14, m: 0 },
      end: { h: 18, m: 0 },
      days: [8],
      title: "final day event ends at 6:00pm so OK",
      description: "NA",
      atCamp: true,
      type: "prty",
    },
    false,
  ],
  [
    {
      start: { h: 14, m: 0 },
      end: { h: 19, m: 0 },
      days: [1, 2, 3, 4, 6, 7, 8],
      title: "invalid final day event ending after 6:00pm",
      description: "NA",
      atCamp: true,
      type: "prty",
    },
    "Events on final day cannot go past 6:00pm",
  ],
  [
    {
      start: { h: 8, m: 0 },
      end: { h: 20, m: 1 },
      days: [1],
      title: "more than 12 hours long",
      description: "NA",
      atCamp: true,
      type: "prty",
    },
    "Events may not be longer than 12 hours",
  ],
  [
    {
      start: { h: 22, m: 30 },
      end: { h: 10, m: 31 },
      days: [1],
      title: "more than 12 hours long",
      description: "NA",
      atCamp: true,
      type: "prty",
    },
    "Events may not be longer than 12 hours",
  ],
  [
    {
      start: { h: 20, m: 0 },
      end: { h: 2, m: 0 },
      days: [1],
      title: "New event",
      description:
        "Future Turtles invites you to our opening night bash. Cosmos, dance music, hugs and friendly bartenders.",
      atCamp: true,
      type: "prty",
    },
    "Event needs a name",
  ],
  [
    {
      start: { h: 20, m: 0 },
      end: { h: 2, m: 0 },
      days: [1],
      title: "",
      description:
        "Future Turtles invites you to our opening night bash. Cosmos, dance music, hugs and friendly bartenders.",
      atCamp: true,
      type: "prty",
    },
    "Event needs a name",
  ],
  [
    {
      start: { h: 20, m: 0 },
      end: { h: 2, m: 0 },
      days: [1],
      title: "ab",
      description:
        "Future Turtles invites you to our opening night bash. Cosmos, dance music, hugs and friendly bartenders.",
      atCamp: true,
      type: "prty",
    },
    "Event name must be at least three letters long",
  ],
  [
    {
      start: { h: 20, m: 0 },
      end: { h: 2, m: 0 },
      days: [1],
      title: "Tiara party",
      description: "",
      atCamp: true,
      type: "prty",
    },
    "Event must have a description",
  ],
];

test.each(otherEvents)("Check otherEvents %o", (e, r) => {
  expect(CheckEvent(e)).toBe(r);
});
