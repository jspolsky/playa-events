import { render, screen } from "@testing-library/react";
import App, { sum } from "./App";

test("1 + 1 = 2", () => {
  expect(sum(1, 1)).toBe(2);
});
