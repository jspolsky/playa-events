import React from "react";
import { render } from "@testing-library/react";

import { ConfirmDialog } from "./ConfirmDialog.js";

test("Confirm Dialog", () => {
  const fn = () => {
    return null;
  };

  const tree = render(
    <ConfirmDialog
      open={true}
      setOpen={fn}
      title="Sample title here"
      message="Some message appears"
      no="Cancel"
      yes="Yes, Delete it"
      doIt={fn}
    />
  );

  expect(tree).toMatchSnapshot();
});
