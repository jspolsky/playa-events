import React, { useState, useEffect } from "react";

import Draggable from "react-draggable";
import Form from "react-bootstrap/Form";

import Table from "react-bootstrap/Table";
import moment from "moment";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";

import { burningManDates, yearDefault } from "../dateFunctions.js";

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
  title,
  setTitle,
  description,
  setDescription,
  close,
  show,
}) => {
  return (
    <Dialog open={show} onClose={close} maxWidth="lg" fullWidth={true}>
      <DialogContent dividers>
        <Form.Group>
          <Form.Label>Event name</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Event name"
          />
          <br />
          <Table size="sm">
            <tbody>
              <tr>
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
                  <td className="text-center" key={`dow${i}`}>
                    {x}
                  </td>
                ))}
              </tr>
              <tr>
                {[...Array(9)].map((x, i) => (
                  <td className="text-center" key={`dow${i}`}>
                    <Form.Check
                      inline
                      style={{ marginRight: 0 }}
                      type="checkbox"
                    ></Form.Check>
                  </td>
                ))}
              </tr>
            </tbody>
          </Table>

          <br />

          <br />
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Form.Group>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={close}>
          Cancel
        </Button>
        <Button color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export const EventDialog = ({ show, close, event }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [days, setDays] = useState([]);
  const [start, setStart] = useState({ h: 12, m: 0 });
  const [end, setEnd] = useState({ h: 12, m: 0 });

  useEffect(() => {
    if (show) {
      // dialog just appeared
      // pull out editable data from event
      setTitle(event.title);
      setDescription(event.description);
      setDays(event.days);
      setStart(event.start);
      setEnd(event.end);
    } else {
      // dialog just disappeared
      setEditing(false);
    }
  }, [show, event]);

  const handleClose = (event) => {
    close();
  };

  if (editing) {
    return (
      <EventDialogEditing
        show={show}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        close={handleClose}
      />
    );
  } else {
    return (
      <EventDialogStatic
        days={days}
        start={start}
        end={end}
        description={description}
        title={title}
        close={handleClose}
        setEditing={setEditing}
        show={show}
      />
    );
  }
};
