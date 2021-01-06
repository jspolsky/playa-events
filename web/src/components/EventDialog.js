import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Draggable from "react-draggable";
import ModalDialog from "react-bootstrap/ModalDialog";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import moment from "moment";

import editButton from "../assets/edit.svg";
import deleteButton from "../assets/delete.svg";
import closeButton from "../assets/close.svg";

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

const DraggableModalDialog = (props) => {
  return (
    <Draggable handle=".modal-header">
      <ModalDialog {...props} />
    </Draggable>
  );
};

const WeeButton = ({ name, button, onClick }) => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>{name}</Tooltip>}
      delay={{ show: 250, hide: 400 }}
    >
      <Image src={button} onClick={onClick} />
    </OverlayTrigger>
  );
};

const EventDialogHeader = ({ editing, setEditing, event, close, title }) => {
  return editing ? (
    <Modal.Header>
      <Modal.Title>{title}</Modal.Title>
      <div style={{ marginLeft: "auto" }}>
        <WeeButton
          name="Close"
          button={closeButton}
          onClick={() => {
            close();
          }}
        />
      </div>
    </Modal.Header>
  ) : (
    <Modal.Header>
      <Modal.Title>{title}</Modal.Title>
      <div style={{ marginLeft: "auto" }}>
        <WeeButton
          name="Edit"
          button={editButton}
          onClick={() => {
            setEditing(true);
          }}
        />
        <WeeButton name="Delete" button={deleteButton} />
        <WeeButton name="Close" button={closeButton} onClick={close} />
      </div>
    </Modal.Header>
  );
};

const EventDialogBody = ({
  editing,
  event,
  title,
  setTitle,
  description,
  setDescription,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
}) => {
  return editing ? (
    <Modal.Body>
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
        <Form.Row>
          <Col>
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="time"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
              }}
            ></Form.Control>
          </Col>
          <Col>
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="time"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value);
              }}
            ></Form.Control>
          </Col>
        </Form.Row>

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
    </Modal.Body>
  ) : (
    <Modal.Body>
      <strong>
        {startTime}
        &ndash;
        {endTime}
      </strong>
      <br></br>
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
    </Modal.Body>
  );
};

const EventDialogFooter = ({ editing }) => {
  if (editing) {
    return <Modal.Footer>Save</Modal.Footer>;
  } else {
    return <div />;
  }
};

export const EventDialog = ({ show, close, event }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  useEffect(() => {
    if (show) {
      // dialog just appeared
      // pull out editable data from event
      setTitle(event.title);
      setDescription(event.description);
      setStartTime(moment(event.start).format("HH:mm:ss"));
      setEndTime(moment(event.end).format("HH:mm:ss"));
    } else {
      // dialog just disappeared
      setEditing(false);

      console.log(startTime);
      console.log(endTime);
    }
  }, [show, event]);

  const handleClose = (event) => {
    close();
  };

  return (
    <Modal
      animation={false}
      dialogAs={DraggableModalDialog}
      show={show}
      onHide={handleClose}
      size="lg"
      centered
    >
      <EventDialogHeader
        event={event}
        title={title}
        close={handleClose}
        editing={editing}
        setEditing={setEditing}
      />
      <EventDialogBody
        event={event}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        editing={editing}
      />
      <EventDialogFooter editing={editing} />
    </Modal>
  );
};
