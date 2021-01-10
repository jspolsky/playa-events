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
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";

import { burningManDates, yearDefault } from "../dateFunctions.js";
import { FormControlLabel } from "@material-ui/core";

//
// 2019 event types were:
//
// Gathering/Party prty 🥳
// Adult-oriented adlt 🔞
// Care/Support care 🖐
// Fire fire 🔥
// Food food 🍽
// Game game 🎲
// Kid-friendly kid 🧸
// Other othr
// Parade para 🤸‍♀️
// Performance perf 🎭
// Class/Workshop work 🧑‍🏫
//

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
        {moment({ hour: start.h, minute: start.m }).format("h:mma")}
        &mdash;
        {moment({ hour: end.h, minute: end.m }).format("h:mma")}
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
  close,
  setEditing,
  show,
}) => {
  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    editButton: {
      position: "absolute",
      right: theme.spacing(13),
      top: theme.spacing(1),
    },
    deleteButton: {
      position: "absolute",
      right: theme.spacing(7),
      top: theme.spacing(1),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
  });

  const DialogTitleWithButtons = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <DialogTitle className={classes.root} {...other}>
        {children}

        <IconButton
          aria-label="edit"
          onClick={() => {
            setEditing(true);
          }}
          className={classes.editButton}
        >
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" className={classes.deleteButton}>
          <DeleteIcon />
        </IconButton>
        <IconButton
          aria-label="close"
          onClick={close}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
    );
  });

  return (
    <Dialog
      PaperComponent={PaperComponent}
      open={show}
      onClose={close}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitleWithButtons id="draggable-dialog-title">
        {title}
      </DialogTitleWithButtons>
      <DialogContent dividers>
        <EventDialogWhen days={days} start={start} end={end} />
        <br></br>
        {description}
        <br></br>
        <br></br>
        <strong>Location:</strong> Christmas Camp
        <br />
        <i>(camp address will be provided by Placement)</i>
        <br />
        <br />
        <span style={{ fontSize: "2.2rem" }}>🤸‍♀️ 🍽 🔞</span>
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
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></TextField>
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

export const EventDialog = ({ show, close, event, saveEvent }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState([]);
  const [start, setStart] = useState({ h: 12, m: 0 });
  const [end, setEnd] = useState({ h: 12, m: 0 });
  const [rawid, setRawId] = useState(0);

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
    } else {
      // dialog just disappeared
      setEditing(false);
    }
  }, [show, event]);

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
        close={handleClose}
        setEditing={setEditing}
      />
    );
  }
};
