import React from "react";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Draggable from "react-draggable";
import ModalDialog from "react-bootstrap/ModalDialog";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
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

export const WeeButton = (props) => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>{props.name}</Tooltip>}
      delay={{ show: 250, hide: 400 }}
    >
      <Image src={props.button} onClick={props.onClick} />
    </OverlayTrigger>
  );
};

export const EventDialog = (props) => {
  return (
    <Modal
      animation={false}
      dialogAs={DraggableModalDialog}
      show={props.show}
      onHide={props.close}
      size="lg"
      centered
    >
      <Modal.Header>
        <Modal.Title>{props.event.title}</Modal.Title>
        <div style={{ marginLeft: "auto" }}>
          <WeeButton name="Edit" button={editButton} />
          <WeeButton name="Delete" button={deleteButton} />
          <WeeButton name="Close" button={closeButton} onClick={props.close} />
        </div>
      </Modal.Header>
      <Modal.Body>
        <strong>
          {moment(props.event.start).format("dddd MMM D")}
          <br />
          {moment(props.event.start).format("h:mma")}
          &ndash;
          {moment(props.event.end).format("h:mma")}
        </strong>
        <br></br>
        <br></br>
        {props.event.description}
        <br></br>
        <br></br>
        <strong>Location:</strong> Christmas Camp
        <br />
        <i>(camp address will be provided by Placement)</i>
        <br />
        <br />
        <span style={{fontSize:"2.2rem"}}>🤸‍♀️ 🍽 🔞</span>
      </Modal.Body>
      <Modal.Footer>Save</Modal.Footer>
    </Modal>
  );
};
