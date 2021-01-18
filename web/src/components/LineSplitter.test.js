import React from "react";
import { render } from "@testing-library/react";

import { LineSplitter } from "./LineSplitter.js";

test("LineSplitter", () => {
  let a = "Simple Line";
  let tree = render(<LineSplitter variant="body1">{a}</LineSplitter>);
  expect(tree).toMatchSnapshot();

  a = "Line\nWith Newline";
  tree = render(<LineSplitter variant="body2">{a}</LineSplitter>);
  expect(tree).toMatchSnapshot();

  a = null; // blank
  tree = render(<LineSplitter variant="body2">{a}</LineSplitter>);
  expect(tree).toMatchSnapshot();
});
