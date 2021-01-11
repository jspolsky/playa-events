import React, { useState } from "react";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Autocomplete from "@material-ui/lab/Autocomplete";

export const FormatTime = ({ h, m }) => {
  return moment({ hour: h, minute: m }).format("h:mma");
};

let startTimes = [];
for (let h = 0; h < 24; h++) {
  for (let m = 0; m < 60; m += 15) {
    startTimes.push(FormatTime({ h: h, m: m }));
  }
}

const ParseTime = (s) => {
  const m = moment(s, "LT");
  let result = false;

  if (m.isValid()) {
    result = { h: m.get("hours"), m: m.get("minutes") };
  }

  return result;
};

// start and end format is { h: 12, m: 30 }
// h is in 24 hour format, so {h:14, m:0} is 2pm
// if end.h < start.h, the event goes past midnight.

export const TimeSpanEditor = ({ start, setStart, end, setEnd }) => {
  const [startInput, setStartInput] = useState(FormatTime(start));
  const [startValue, setStartValue] = useState(FormatTime(start));
  const [validTime, setValidTime] = useState(true);

  return (
    <>
      <div>
        {FormatTime(start)} to {FormatTime(end)}
      </div>
      <Tooltip
        title="Invalid time"
        arrow
        placement="top-start"
        open={!validTime}
      >
        <Autocomplete
          id="starttime"
          freeSolo={true}
          disableClearable={true}
          size="small"
          options={startTimes}
          style={{ width: "7rem" }}
          inputValue={startInput}
          onInputChange={(event, newInputValue) => {
            const parsed = ParseTime(newInputValue);
            setValidTime(!!parsed);
            setStartInput(newInputValue);
          }}
          value={startValue}
          onChange={(event, newValue) => {
            setStartValue(newValue);
          }}
          onBlur={() => {
            const parsed = ParseTime(startInput);
            if (parsed) {
              setStartInput(FormatTime(parsed));
              setStart(parsed);
            } else {
              // you can't type
              // restore original start time
              setStartInput(FormatTime(start));
              setValidTime(true);
            }
          }}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      </Tooltip>
    </>
  );
};
