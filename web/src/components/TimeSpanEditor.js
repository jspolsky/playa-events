import React, { useState } from "react";
import moment from "moment";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Popper from "@material-ui/core/Popper";
import Grid from "@material-ui/core/Grid";

export const FormatTime = ({ h, m }) => {
  return moment({ hour: h, minute: m }).format("h:mma");
};

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
  const [startIsValid, setStartIsValid] = useState(true);

  const [endInput, setEndInput] = useState(FormatTime(end));
  const [endValue, setEndValue] = useState(FormatTime(end));
  const [endIsValid, setEndIsValid] = useState(true);

  let startTimes = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      startTimes.push(FormatTime({ h: h, m: m }));
    }
  }

  // possible event durations in minutes
  let eventDurations = [0, 15, 30, 45];
  for (let dx = 60; dx < 24 * 60; dx += 30) {
    eventDurations.push(dx);
  }

  const endOptions = eventDurations.map((dx) => {
    const thisEndMin = start.h * 60 + start.m + dx;
    const thisEnd = { h: (thisEndMin / 60) % 24, m: thisEndMin % 60 };

    return {
      label: FormatTime(thisEnd),
      render:
        FormatTime(thisEnd) +
        (dx < 60 ? ` (${dx} minutes)` : ` (${dx / 60} hours)`),
    };
  });

  const WidePopper = (props) => {
    const styles = (theme) => ({
      popper: {
        width: "fit-content",
      },
    });

    return <Popper {...props} style={styles.popper} placement="bottom-start" />;
  };

  return (
    <Grid container direction="row" justify="flex-start" alignItems="center">
      <Tooltip
        title="Invalid time"
        arrow
        placement="top-start"
        open={!startIsValid}
      >
        <Autocomplete
          id="starttime"
          freeSolo={true}
          disableClearable={true}
          size="small"
          style={{ width: "8rem", marginRight: "0.5rem" }}
          options={startTimes}
          inputValue={startInput}
          onInputChange={(event, newInputValue) => {
            const parsed = ParseTime(newInputValue);
            setStartIsValid(!!parsed);
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
              // successfully setting the start time
              // always bumps the end time to keep
              // the same duration
              const dxMinutes =
                (24 * 60 + (end.h * 60 + end.m) - (start.h * 60 + start.m)) %
                (24 * 60);
              const endMinutes = parsed.h * 60 + parsed.m + dxMinutes;
              setStart(parsed);
              const newEnd = { h: (endMinutes / 60) % 24, m: endMinutes % 60 };
              setEnd(newEnd);
              setEndValue(FormatTime(newEnd));
              setEndInput(FormatTime(newEnd));
            } else {
              // you can't type
              // restore original start time
              setStartInput(FormatTime(start));
              setStartIsValid(true);
            }
          }}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      </Tooltip>
      <span>to</span>
      <Tooltip
        title="Invalid time"
        arrow
        placement="top-start"
        open={!endIsValid}
      >
        <Autocomplete
          id="endtime"
          freeSolo={true}
          disableClearable={true}
          size="small"
          style={{ width: "8rem", marginLeft: "0.5rem" }}
          PopperComponent={WidePopper}
          options={endOptions}
          renderOption={(option) => {
            return option.render;
          }}
          getOptionLabel={(option) => {
            if (option.label) return option.label;
            else return option;
          }}
          inputValue={endInput}
          onInputChange={(event, newInputValue) => {
            const parsed = ParseTime(newInputValue);
            setEndIsValid(!!parsed);
            setEndInput(newInputValue);
          }}
          value={endValue}
          onChange={(event, newValue) => {
            setEndValue(newValue);
          }}
          onBlur={() => {
            const parsed = ParseTime(endInput);
            if (parsed) {
              setEndInput(FormatTime(parsed));
              setEnd(parsed);
            } else {
              // you can't type
              // restore original end time
              setEndInput(FormatTime(end));
              setEndIsValid(true);
            }
          }}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      </Tooltip>
    </Grid>
  );
};
