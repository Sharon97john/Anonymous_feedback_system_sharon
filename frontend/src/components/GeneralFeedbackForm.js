import React, { useState } from "react";
import "./FeedbackFormCommonStyle.scss";
import "react-widgets/scss/styles.scss";
import DropdownList from "react-widgets/DropdownList";
import { sendFeedback } from "../api";
const GeneralFeedbackForm = (props) => {
  const [department, setdepartment] = useState(null);
  const [feedback, setfeedback] = useState(null);
  const submitFeedback = () => {
    let user_feedback = {
      description: feedback,
      department_id: department.id,
      user_id: JSON.parse(localStorage.getItem("userdata")).id
    };
    sendFeedbackMail(user_feedback);
  };
  const closeModal = () => {
    props.onClose(true);
  };
  const sendFeedbackMail = async (user_feedback) => {
    props.toggleLoader(true)
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
      props.toggleLoader(false)
    }
  };
  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setfeedback(value);
  };
  return (
    <form>
      <div className="feedbk-form-wrapper">
        <div className="form-header">
          <h4>General Feedback Form</h4>
        </div>

        <div className="form-body">
          <label>Department Name</label>
          {/* <input type="text" placeholder="Choose Department Name" required /> */}
          <DropdownList
            placeholder="Select or Search a Department"
            textField="department_name"
            dataKey="id"
            filter="contains"
            name={department}
            data={props.departments}
            onChange={setdepartment}
          />
          <label>Feedback</label>
          <textarea
            name={feedback}
            placeholder="Enter your feedback"
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="form-footer">
          <button
            type="button"
            className="common-btn-style submit-btn"
            onClick={submitFeedback}
          >
            Submit
          </button>
          <button
            type="button"
            className="common-btn-style cancel-btn"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};
export default GeneralFeedbackForm;
