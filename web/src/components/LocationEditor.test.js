import React from "react";
import { render } from "@testing-library/react";

import { LocationEditor } from "./LocationEditor.js";

test.each(["camp", "art", "other"])("LocationEditor %s", (x) => {
  const fn = () => {
    return null;
  };

  const tree = render(
    <LocationEditor
      location={"Turtles"}
      locationType={x}
      setLocation={fn}
      setLocationType={fn}
    />
  );

  expect(tree).toMatchSnapshot();
});
