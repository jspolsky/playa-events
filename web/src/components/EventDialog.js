import React from "react";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Draggable from "react-draggable";
import ModalDialog from "react-bootstrap/ModalDialog";
import moment from "moment";

import editButton from "../assets/edit.svg";
import deleteButton from "../assets/delete.svg";
import closeButton from "../assets/close.svg";

const DraggableModalDialog = (props) => {
  return (
    <Draggable handle=".modal-header">
      <ModalDialog {...props} />
    </Draggable>
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
          <Image src={editButton} />
          <Image src={deleteButton} />
          <Image src={closeButton} />
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
      </Modal.Body>
      <Modal.Footer>Save</Modal.Footer>
    </Modal>
  );
};
