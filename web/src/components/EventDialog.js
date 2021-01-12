import React, { useState, useEffect } from "react";

import Draggable from "react-draggable";

import moment from "moment";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";

import { burningManDates, yearDefault } from "../dateFunctions.js";
import { TimeSpanEditor, FormatTime } from "./TimeSpanEditor.js";
import { FormControlLabel } from "@material-ui/core";

const eventTypes = [
  { code: "prty", full: "Gathering/Party", emoji: "🥳" },
  { code: "adlt", full: "Adult oriented", emoji: "🔞" },
  { code: "care", full: "Care/Support", emoji: "🧘" },
  { code: "fire", full: "Fire", emoji: "🔥" },
  { code: "food", full: "Food", emoji: "🍽" },
  { code: "game", full: "Game", emoji: "🎲" },
  { code: "kid", full: "Kid friendly", emoji: "🧸" },
  { code: "para", full: "Parade", emoji: "🤸‍♀️" },
  { code: "perf", full: "Performance", emoji: "🎭" },
  { code: "work", full: "Class/Workshop", emoji: "🧑‍🏫" },
  { code: "othr", full: "Other", emoji: "🦄" }, // this has to be last
];

const [firstDay] = burningManDates(yearDefault());

const PaperComponent = (props) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
};

const EventDialogWhen = ({ days, start, end }) => {
  return (
    <div>
      {days.map((d, ix) => (
        <div key={`ix${ix}`}>
          {moment(firstDay).add(d, "days").format("ddd, MMM D")}
        </div>
      ))}
      <strong>
        {FormatTime(start)} to {FormatTime(end)}
      </strong>
      <em>{end.h < start.h ? " next day" : ""}</em>
    </div>
  );
};

const EventDialogStatic = ({
  days,
  start,
  end,
  description,
  title,
  atCamp,
  location,
  type,
  close,
  setEditing,
  show,
}) => {
  const DialogTitleButtons = (props) => {
    const { onClose, ...other } = props;
    return (
      <DialogTitle
        {...other}
        style={{ padding: "0 0 0 0", marginLeft: "auto" }}
      >
        <IconButton
          aria-label="edit"
          onClick={() => {
            setEditing(true);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="close" onClick={close}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
    );
  };

  const eventType =
    eventTypes.find((x) => x.code === type) ??
    eventTypes[eventTypes.length - 1];

  return (
    <Dialog
      PaperComponent={PaperComponent}
      open={show}
      onClose={close}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitleButtons id="draggable-dialog-title"></DialogTitleButtons>
      <DialogContent dividers>
        <div style={{ marginBottom: "2rem", fontSize: "150%" }}>
          <strong>{title}</strong>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          {eventType.emoji} {eventType.full}
        </div>
        <EventDialogWhen days={days} start={start} end={end} />
        <br></br>
        {description}
        <br></br>
        <br></br>
        <strong>Location:</strong>
        <br />
        {atCamp ? (
          <i>(camp address will be provided by Placement)</i>
        ) : (
          <span>{location}</span>
        )}
      </DialogContent>
    </Dialog>
  );
};

const EventDialogEditing = ({
  show,
  days,
  setDays,
  title,
  setTitle,
  description,
  setDescription,
  start,
  setStart,
  end,
  setEnd,
  atCamp,
  setAtCamp,
  location,
  setLocation,
  type,
  setType,
  close,
  save,
}) => {
  const handleCheckbox = (e) => {
    var newDays = [];

    for (let i = 0; i < 9; i++) {
      if (i + "" === e.target.value) {
        if (e.target.checked) newDays.push(i);
      } else {
        if (days.includes(i)) newDays.push(i);
      }
    }

    setDays(newDays);
  };

  return (
    <Dialog open={show} onClose={close} fullWidth maxWidth="md">
      <DialogContent dividers>
        <TextField
          fullWidth
          label="Event name"
          variant="outlined"
          size="small"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></TextField>
        <FormControl
          variant="outlined"
          style={{ marginTop: "2rem" }}
          size="small"
        >
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            value={type}
            onChange={(x) => {
              setType(x.target.value);
            }}
            label="Type"
            style={{ minWidth: "8rem" }}
          >
            {eventTypes.map((et) => {
              return (
                <MenuItem
                  value={et.code}
                  key={et.code}
                >{`${et.emoji} ${et.full}`}</MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormLabel component="legend" style={{ marginTop: "2rem" }}>
          What days does this event occur?
        </FormLabel>{" "}
        <Paper variant="outlined">
          {" "}
          <FormGroup row>
            {[
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
              "Sun",
              "Mon",
            ].map((x, i) => (
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    value={i}
                    checked={days.includes(i)}
                    onChange={handleCheckbox}
                  />
                }
                label={x}
                key={"day" + i}
                labelPlacement="bottom"
              />
            ))}
          </FormGroup>
        </Paper>
        <br />
        <TimeSpanEditor
          start={start}
          setStart={setStart}
          end={end}
          setEnd={setEnd}
        />
        <FormControlLabel
          style={{ marginTop: "2rem" }}
          control={
            <Checkbox
              color="primary"
              checked={atCamp}
              onChange={(e) => {
                setAtCamp(e.target.checked);
              }}
            />
          }
          color="primary"
          label="Event takes place at our camp, which is placed"
        />
        <TextField
          fullWidth
          label="Location"
          variant="outlined"
          disabled={atCamp}
          value={
            atCamp
              ? "Placement will fill in the location of your camp"
              : location
          }
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />{" "}
        <TextField
          fullWidth
          multiline
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          style={{ marginTop: "2rem" }}
        />
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={close}>
          Cancel
        </Button>
        <Button color="primary" onClick={save}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const EventDialog = ({
  show,
  close,
  event,
  saveEvent,
  editing,
  setEditing,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState([]);
  const [start, setStart] = useState({ h: 12, m: 0 });
  const [end, setEnd] = useState({ h: 12, m: 0 });
  const [rawid, setRawId] = useState(0);
  const [atCamp, setAtCamp] = useState(true);
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (show) {
      // dialog just appeared
      // pull out editable data from event
      setTitle(event.title);
      setDescription(event.description);
      setDays(event.days);
      setStart(event.start);
      setEnd(event.end);
      setRawId(event.id);
      setAtCamp(!!event.atCamp);
      setLocation(event.location ?? "");
      setType(event.type ?? "othr");
    } else {
      // dialog just disappeared
      setEditing(false);
    }
  }, [show, event, setEditing]);

  const handleClose = () => {
    close();
  };

  const handleSave = () => {
    saveEvent({
      title: title,
      description: description,
      days: days,
      start: start,
      end: end,
      id: rawid,
      atCamp: atCamp,
      location: location,
      type: type,
    });
    close();
  };

  if (editing) {
    return (
      <EventDialogEditing
        show={show}
        days={days}
        setDays={setDays}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        atCamp={atCamp}
        setAtCamp={setAtCamp}
        location={location}
        setLocation={setLocation}
        type={type}
        setType={setType}
        close={handleClose}
        save={handleSave}
      />
    );
  } else {
    return (
      <EventDialogStatic
        show={show}
        days={days}
        start={start}
        end={end}
        description={description}
        title={title}
        atCamp={atCamp}
        location={location}
        type={type}
        close={handleClose}
        setEditing={setEditing}
      />
    );
  }
};
