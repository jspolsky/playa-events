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

const EventDialogHeader = ({ editing, setEditing, event, close }) => {
  return editing ? (
    <Modal.Header>
      <Modal.Title>{event.title}</Modal.Title>
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
      <Modal.Title>{event.title}</Modal.Title>
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

const EventDialogBody = ({ editing, event }) => {
  return editing ? (
    <Modal.Body>
      <Form.Group>
        <Form.Label>Event name</Form.Label>
        <Form.Control size="lg" type="text" placeholder="Event name" />
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
            <Form.Control type="time"></Form.Control>
          </Col>
          <Col>
            <Form.Label>End Time</Form.Label>
            <Form.Control type="time"></Form.Control>
          </Col>
        </Form.Row>

        <br />
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={5} placeholder="Description" />
      </Form.Group>
    </Modal.Body>
  ) : (
    <Modal.Body>
      <strong>
        {moment(event.start).format("dddd MMM D")}
        <br />
        {moment(event.start).format("h:mma")}
        &ndash;
        {moment(event.end).format("h:mma")}
      </strong>
      <br></br>
      <br></br>
      {event.description}
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

  useEffect(() => {
    if (show) {
      // dialog just appeared
    } else {
      // dialog just disappeared
      setEditing(false);
    }
  }, [show]);

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
        close={handleClose}
        editing={editing}
        setEditing={setEditing}
      />
      <EventDialogBody event={event} editing={editing} />
      <EventDialogFooter editing={editing} />
    </Modal>
  );
};
