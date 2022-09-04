import React, { useState } from "react";
import "./FeedbackFormCommonStyle.scss";
import "react-widgets/scss/styles.scss";
import { sendFeedback } from "../api";
const DisplayVotingForm = (props) => {
  const closeModal = () => {
    props.onClose(true);
  };
  console.log(props);
  const submitFeedback = async (user_feedback) => {
    props.toggleLoader(true);
    try {
      let response = await sendFeedback(user_feedback);
      if (response && response.data) {
        response = response.data;
        props.responseReceived({
          status: response.status,
          message: response.message,
        });
        if (response.status) {
          closeModal();
        }
      }
    } catch (err) {
      props.responseReceived({
        status: false,
        message: "Some went wrong. Try again !",
      });
    } finally {
      props.toggleLoader(false);
    }
  };
  return (
    <form>
      <div className="feedbk-form-wrapper">
        <div className="form-header">
          <h4>{props?.formDetails?.title}</h4>
        </div>

        <label>Description:</label>
        <div className="form-body">
          <div>
            {props?.formDetails?.description}
          </div>
        </div>
        <div className="form-footer">
          <button
            type="button"
            className="common-btn-style cancel-btn"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </form>
  );
};
export default DisplayVotingForm;
