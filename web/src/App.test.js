import { render, screen } from "@testing-library/react";
import App, { sum, CalEventsFromRawEvents } from "./App";
import { initialRawEvents } from "./sampleEvents";

test("1 + 1 = 2", () => {
  expect(sum(1, 1)).toBe(2);
});

test("CalEventsFromRawEvents", () => {
  expect(CalEventsFromRawEvents(initialRawEvents)).toMatchSnapshot();
});
