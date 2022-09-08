import Toast from "react-bootstrap/Toast";
import React from "react";
import { ToastContainer } from "react-bootstrap";

function AutohideToaster(props) {
  const closeToaster = () => {
    props.closeToaster(false);
  };
  return (
    <ToastContainer position="top-end">
      <Toast
        // transition
        onClose={closeToaster}
        show={props.isShow}
        delay={4000}
        autohide
        bg={props.content.status}
      >
        <Toast.Header>
          {/* <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" /> */}
          <strong className="me-auto">{props.content.heading}</strong>
          {/* <small>11 mins ago</small> */}
        </Toast.Header>
        <Toast.Body>
          <strong className="text-center">{props.content.message}</strong>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default AutohideToaster;
