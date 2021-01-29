import React, { useState, useEffect } from "react";

import Draggable from "react-draggable";

import moment from "moment";

import Alert from "@material-ui/lab/Alert";
import { withStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";

import { burningManDates, yearDefault } from "../dateFunctions.js";
import { TimeSpanEditor, FormatTime } from "./TimeSpanEditor.js";
import { ConfirmDialog } from "./ConfirmDialog.js";
import { LineSplitter } from "./LineSplitter.js";
import { LocationEditor } from "./LocationEditor";

import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  Paper,
} from "@material-ui/core";

import bannerPrty from "../assets/banner-prty.jpg";
import bannerAdlt from "../assets/banner-adlt.jpg";
import bannerCare from "../assets/banner-care.jpg";
import bannerFire from "../assets/banner-fire.jpg";
import bannerFood from "../assets/banner-food.jpg";
import bannerGame from "../assets/banner-game.jpg";
import bannerKid from "../assets/banner-kid.jpg";
import bannerPara from "../assets/banner-para.jpg";
import bannerPerf from "../assets/banner-perf.jpg";
import bannerWork from "../assets/banner-work.jpg";
import bannerOthr from "../assets/banner-othr.jpg";
import { NameAndDescriptionEditor } from "./NameAndDescriptionEditor";
import { validateURL } from "../validateUrl.js";
import { PrintOptionsEditor } from "./PrintOptionsEditor";

export const eventTypes = [
  { code: "prty", full: "Gathering/Party", emoji: "🥳", banner: bannerPrty },
  { code: "adlt", full: "Adult oriented", emoji: "🔞", banner: bannerAdlt },
  { code: "care", full: "Care/Support", emoji: "🧘", banner: bannerCare },
  { code: "fire", full: "Fire", emoji: "🔥", banner: bannerFire },
  { code: "food", full: "Food", emoji: "🍽", banner: bannerFood },
  { code: "game", full: "Game", emoji: "🎲", banner: bannerGame },
  { code: "kid", full: "Kid friendly", emoji: "🧸", banner: bannerKid },
  { code: "para", full: "Parade", emoji: "🤸‍♀️", banner: bannerPara },
  { code: "perf", full: "Performance", emoji: "🎭", banner: bannerPerf },
  { code: "work", full: "Class/Workshop", emoji: "🧑‍🏫", banner: bannerWork },
  { code: "othr", full: "Other", emoji: "🦄", banner: bannerOthr }, // this has to be last
];

const BannerFromType = (type) => eventTypes.find((x) => x.code === type).banner;

const [firstDay] = burningManDates(yearDefault());

const styles = (theme) => ({
  toolButton: {
    opacity: "70%",
    backgroundColor: "white",
    padding: "7px",
    margin: "5px",
    "&:hover": { backgroundColor: "white", opacity: "100%", color: "blue" },
  },

  staticTitlebar: {
    padding: "0 0 0 0",
    xmarginLeft: "auto",
    display: "flex",
    justifyContent: "flex-end",
    height: "120px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
});

const PaperComponent = (props) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"],[class*="MuiButtonBase-root"]'}
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
  show,
  days,
  start,
  end,
  description,
  title,
  url,
  location,
  locationType,
  type,
  global,
  eventError,
  close,
  setEditing,
  handleDelete,
}) => {
  const [openConfirmDelete, setOpenConfirmDelete] = React.useState(false);

  const DialogTitleButtons = withStyles(styles)((props) => {
    const { onClose, classes, ...other } = props;
    return (
      <DialogTitle
        {...other}
        className={classes.staticTitlebar}
        style={{ backgroundImage: `url(${BannerFromType(type)})` }}
      >
        {!global ? (
          <>
            <IconButton
              aria-label="edit"
              onClick={() => {
                setEditing(true);
              }}
              color="primary"
              className={classes.toolButton}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => {
                setOpenConfirmDelete(true);
              }}
              color="primary"
              className={classes.toolButton}
            >
              <DeleteIcon />
            </IconButton>
          </>
        ) : (
          ""
        )}
        <IconButton
          aria-label="close"
          onClick={close}
          color="primary"
          className={classes.toolButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
    );
  });

  const eventType =
    eventTypes.find((x) => x.code === type) ??
    eventTypes[eventTypes.length - 1];

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      PaperComponent={PaperComponent}
      open={show}
      onClose={close}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitleButtons id="draggable-dialog-title"></DialogTitleButtons>
      <DialogContent dividers>
        {eventError ? (
          <Alert severity="error" elevation={6} variant="filled">
            {eventError}
          </Alert>
        ) : null}
        <div style={{ marginBottom: "0.1rem", fontSize: "150%" }}>
          <strong>{title}</strong>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          {eventType.emoji} {eventType.full}{" "}
        </div>
        <EventDialogWhen days={days} start={start} end={end} />
        <br></br>
        <LineSplitter variant="body1">{description}</LineSplitter>
        {url && validateURL(url) && (
          <div>
            <a target="_blank" rel="noreferrer" href={url}>
              {url}
            </a>
          </div>
        )}
        <br></br>
        <br></br>
        <strong>Location:</strong>
        <br />
        {locationType === "camp" ? (
          <span>Located at theme camp ({location})</span>
        ) : locationType === "art" ? (
          <span>Located at art work ({location})</span>
        ) : (
          <span>{location}</span>
        )}

        <ConfirmDialog
          open={openConfirmDelete}
          setOpen={setOpenConfirmDelete}
          title="Delete this event?"
          message={
            days.length > 1
              ? `This will delete ALL ${days.length} occurences of this event. Are you sure?`
              : "Are you sure you want to delete this event?"
          }
          no="Cancel"
          yes="Yes, Delete it"
          doIt={handleDelete}
        />
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
  printDescription,
  setPrintDescription,
  url,
  setUrl,
  start,
  setStart,
  end,
  setEnd,
  locationType,
  setLocationType,
  location,
  setLocation,
  type,
  setType,
  submitForPrint,
  setSubmitForPrint,
  close,
  save,
}) => {
  const [dirty, setDirty] = useState(false);

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
    setDirty(true);
  };

  return (
    <Dialog
      open={show}
      onClose={close}
      fullWidth
      maxWidth="md"
      disableBackdropClick
      onBackdropClick={() => {
        if (!dirty) close();
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setDirty(false);
          save();
        }}
      >
        <DialogContent dividers style={{ backgroundColor: "#e0e0e0" }}>
          <NameAndDescriptionEditor
            title={title}
            setTitle={setTitle}
            type={type}
            setType={setType}
            description={description}
            setDescription={setDescription}
            url={url}
            setUrl={setUrl}
            setDirty={setDirty}
          />
          <Card style={{ marginBottom: "1rem" }}>
            <CardContent>
              <FormLabel component="legend">
                When does this event occur?
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
                setDirty={setDirty}
              />{" "}
            </CardContent>
          </Card>
          <LocationEditor
            location={location}
            setLocation={setLocation}
            locationType={locationType}
            setLocationType={setLocationType}
            setDirty={setDirty}
          />
          <PrintOptionsEditor
            submitForPrint={submitForPrint}
            setSubmitForPrint={setSubmitForPrint}
            printDescription={printDescription}
            setPrintDescription={setPrintDescription}
            description={description}
            setDirty={setDirty}
          />
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={close}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export const EventDialog = ({
  show,
  close,
  event,
  saveEvent,
  deleteEvent,
  editing,
  setEditing,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [printDescription, setPrintDescription] = useState("");
  const [url, setUrl] = useState("");
  const [days, setDays] = useState([]);
  const [start, setStart] = useState({ h: 12, m: 0 });
  const [end, setEnd] = useState({ h: 12, m: 0 });
  const [rawid, setRawId] = useState(0);
  const [locationType, setLocationType] = useState("other");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [submitForPrint, setSubmitForPrint] = useState(false);
  const [global, setGlobal] = useState(false);
  const [eventError, setEventError] = useState(false);

  useEffect(() => {
    if (show) {
      // dialog just appeared
      // pull out editable data from event
      setTitle(event.title);
      setDescription(event.description);
      setPrintDescription(event.printDescription ?? "");
      setUrl(event.url ?? "");
      setDays(event.days);
      setStart(event.start);
      setEnd(event.end);
      setRawId(event.id);
      setLocation(event.location ?? "");
      setLocationType(event.locationType ?? "other");
      setType(event.type ?? "othr");
      setSubmitForPrint(!!event.submitForPrint);
      setGlobal(!!event.global);
      setEventError(event.eventError);
    } else {
      // dialog just disappeared
      setEditing(false);
    }
  }, [show, event, setEditing]);

  const handleClose = () => {
    if (event.newEvent) {
      deleteEvent(event.id);
    }
    close();
  };

  const handleSave = () => {
    saveEvent({
      title: title,
      description: description,
      printDescription: printDescription,
      url: url,
      days: days,
      start: start,
      end: end,
      id: rawid,
      location: location,
      locationType: locationType,
      type: type,
      submitForPrint: submitForPrint,
      newEvent: false,
    });
    close();
  };

  const handleDelete = () => {
    deleteEvent(rawid);
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
        printDescription={printDescription}
        setPrintDescription={setPrintDescription}
        url={url}
        setUrl={setUrl}
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        location={location}
        setLocation={setLocation}
        locationType={locationType}
        setLocationType={setLocationType}
        type={type}
        setType={setType}
        submitForPrint={submitForPrint}
        setSubmitForPrint={setSubmitForPrint}
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
        url={url}
        location={location}
        locationType={locationType}
        type={type}
        global={global}
        eventError={eventError}
        close={handleClose}
        setEditing={setEditing}
        handleDelete={handleDelete}
      />
    );
  }
};
