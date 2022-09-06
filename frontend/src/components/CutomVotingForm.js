import React, { useState, useEffect } from "react";
import "./FeedbackFormCommonStyle.scss";
import "react-widgets/scss/styles.scss";
import { submitVotingFormApi } from "../api";
import DatePicker from "react-date-picker";
const CustomVotingForm = (props) => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [expiry_date, setExpiryDate] = useState(null);
  const closeModal = () => {
    props.onClose(true);
  };
  useEffect(() => {
    debugger;
    if (props.formDetails) {
      setTitle(props.formDetails.title);
      setDescription(props.formDetails.description);
      setExpiryDate(new Date(props.formDetails.expiry_date));
    }
  }, []);
  const submitVotingForm = async () => {
    props.toggleLoader(true);
    let data = {};
    if (props.formDetails) {
      data = { ...props.formDetails };
    }
    data["title"] = title;
    data["department_id"] = JSON.parse(
        localStorage.getItem("userdata")
      ).department.id;
    data["description"] = description;
    data["expiry_date"] = expiry_date;
    try {
      let response = await submitVotingFormApi(data);
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
  const handleInputChange = (event, key) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    if (key == "description") {
      setDescription(value);
    } else if (key == "title") {
      setTitle(value);
    }
  };
  return (
    <form>
      <div className="feedbk-form-wrapper">
        <div className="form-header">
          <h4>Create a New Suggestion</h4>
        </div>

        <div className="form-body">
          <label>Title</label>
          <input
            value={title ? title : ''}
            type="text"
            placeholder="Enter your title"
            onChange={(e) => handleInputChange(e, "title")}
          />
          <label>Description</label>
          <textarea
            value={description ? description : ''}
            placeholder="Enter your description"
            onChange={(e) => handleInputChange(e, "description")}
          ></textarea>
          <label>Expiry Date: </label>
          <DatePicker
            className="datepicker-common"
            calendarClassName="datepicker-field"
            onChange={setExpiryDate}
            value={expiry_date ? expiry_date : ''}
          />
        </div>

        <div className="form-footer">
          <button
            type="button"
            className="common-btn-style submit-btn"
            onClick={submitVotingForm}
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
export default CustomVotingForm;
