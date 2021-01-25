import React from "react";
import { render } from "@testing-library/react";

import { LocationEditor } from "./LocationEditor.js";

test("LocationEditor", () => {
  const fn = () => {
    return null;
  };

  const tree = render(
    <LocationEditor
      location={"Turtles"}
      locationType={"camp"}
      setLocation={fn}
      setLocationType={fn}
    />
  );

  expect(tree).toMatchSnapshot();
});
