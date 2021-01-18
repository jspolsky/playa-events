import React from "react";
import Typeography from "@material-ui/core/Typography";

// utility function that converts "text\nwith\nnewlines"
// into multiple paragraphs. That way anything entered
// with newlines into a TEXTAREA (like the event description)
// can be displayed, statically, with the same linespacing.

// The little extra &nbsp; stuck in at the end
// insures that "\n\n" displays with a full blank line.

export const LineSplitter = ({ children, variant }) => {
  return (children ?? "").split("\n").map((s, i) => (
    <Typeography variant={variant} key={`p${i}`}>
      {s}&nbsp;
    </Typeography>
  ));
};
