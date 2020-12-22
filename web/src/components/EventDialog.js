import React from "react";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Draggable from "react-draggable";
import ModalDialog from "react-bootstrap/ModalDialog";

import editButton from "../assets/edit.svg";
import deleteButton from "../assets/delete.svg";
import xButton from "../assets/close.svg";

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
          <Image src={xButton} />
        </div>
      </Modal.Header>
      <Modal.Body>
        This is the body of the modal <br />
        it is where all the lovely editing takes place. It can be in "static" or
        "editable" mode. You have to hit the edit button to get into editable
        mode, unless this is a new event. I would love for this to be draggable.
      </Modal.Body>
      <Modal.Footer>
        {" "}
        This is the footer of the modal. When you are in Edit mode, a Save
        button appears here.
      </Modal.Footer>
    </Modal>
  );
};
