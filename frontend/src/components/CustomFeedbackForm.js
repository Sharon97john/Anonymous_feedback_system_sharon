import React, { useState, useEffect } from "react";
import "./FeedbackFormCommonStyle.scss";
import "./CustomFeedbackForm.scss";
import DropdownList from "react-widgets/DropdownList";
import { useForm } from "react-hook-form";
import { saveCustomFeedbackForm } from "../api";
import DatePicker from "react-date-picker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross, faTimes } from "@fortawesome/free-solid-svg-icons";
const CustomFeedbackForm = (props) => {
  const [value, setExpiryDate] = useState(new Date());
  const [type, setQuestionType] = useState(null);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [formDetails, setFormDetails] = useState([]);
  const { register, handleSubmit } = useForm();
  const [id, setId] = useState();
  const closeModal = () => {
    props.onClose(true);
  };
  useEffect(() => {
    debugger;
    if (props.formDetails) {
      setId(formDetails.id);
      setFormDetails([...props.formDetails.form]);
      setTitle(props.formDetails.title);
      setDescription(props.formDetails.description);
      setExpiryDate(new Date(props.formDetails.expiry_date));
    }
  }, []);
  const question_type = props.questionTypes;
  const addNewQuestion = () => {
    setFormDetails([
      ...formDetails,
      {
        question_type: type.id,
        description: "",
        isOption: type.id != 1 ? true : false,
        options: type.id != 1 ? [{ description: "" }] : [],
      },
    ]);
  };
  const addNewOption = (index) => {
    formDetails[index]["options"].push({ description: "" });
    setFormDetails([...formDetails]);
  };
  const removeNewOption = (index, option_index) => {
    formDetails[index]["options"].splice(option_index, 1);
    if (formDetails[index]["options"].length == 0) {
      formDetails.splice(index, 1);
    }
    setFormDetails([...formDetails]);
  };
  const removeNewQuestion = (index) => {
    formDetails.splice(index, 1);
    setFormDetails([...formDetails]);
  };
  const saveFeedbackForm = async () => {
    let newDetils = {};
    if (props.formDetails) {
      newDetils["id"] = props.formDetails.id;
      newDetils["department_id"] = props.formDetails.department_id;
      newDetils["created_date"] = props.formDetails.created_date;
    } else {
      newDetils["department_id"] = JSON.parse(
        localStorage.getItem("userdata")
      ).department.id;
    }
    newDetils["form"] = formDetails;
    newDetils["title"] = title;
    newDetils["description"] = description;
    newDetils["expiry_date"] = value;

    try {
      props.toggleLoader(true);
      let response = await saveCustomFeedbackForm(newDetils);
      if (response && response.data) {
        response = response.data;
        props.responseReceived({
          status: response.status,
          message: response.message,
        });
      }
      closeModal();
    } catch (err) {
      props.responseReceived({
        status: false,
        message: "Some went wrong. Try again !",
      });
    } finally {
      props.toggleLoader(false);
    }
  };
  const handleTitleChange = (title) => {
    setTitle(title);
  };
  const handleDescriptionChange = (description) => {
    setDescription(description);
  };
  const handleInputChange = (index, value, optionIndex = null) => {
    const currentFormDetails = formDetails;
    if (optionIndex !== null) {
      currentFormDetails[index].options[optionIndex]["description"] = value;
    } else {
      currentFormDetails[index]["description"] = value;
    }
    setFormDetails([...currentFormDetails]);
  };
  return (
    <form onSubmit={handleSubmit(saveFeedbackForm)}>
      <div className="feedbk-form-wrapper cutom-feedback-wrapper">
        <div className="form-header">
          <h4>Create a New Form</h4>
        </div>
        <div className="form-body">
          <div className="title-exp-wrapper">
            <label>Enter title of your feedback form: </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />

            <label>Expiry Date: </label>
            <DatePicker
              className="datepicker-common"
              calendarClassName="datepicker-field"
              onChange={setExpiryDate}
              value={value}
            />
          </div>
          <label>Description: </label>
          <textarea
            className="cutom-textarea"
            value={description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
          />
          <div className="questions-section">
            {formDetails.length > 0 &&
              formDetails.map((item, index) => {
                return (
                  <div className="question-item m-2" key={index}>
                    <div className="new-question">
                      <span>
                        {index + 1}. {"\n"}
                      </span>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                      />
                      <div className="delete-icon">
                        <FontAwesomeIcon
                          icon={faTimes} title="Delete this question"
                          onClick={() => removeNewQuestion(index)}
                        />
                      </div>
                    </div>

                    {item.question_type != 1 && item.isOption && (
                      <div className="options-wrapper">
                        <div>
                          <label>Options: </label>
                        </div>
                        {item.options.map((option, ind) => {
                          return (
                            <div className="item-options" key={ind}>
                              <input
                                type="text"
                                value={option.description}
                                onChange={(e) =>
                                  handleInputChange(index, e.target.value, ind)
                                }
                              />
                              <div className="delete-icon">
                                <FontAwesomeIcon
                                  icon={faTimes} title="Delete this option"
                                  onClick={() => removeNewOption(index, ind)}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    {item.isOption && (
                      <button
                        type="button"
                        className="common-btn-style"
                        onClick={() => addNewOption(index)}
                      >
                        Add New Option
                      </button>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="new-question-section">
        <label>
          Select a question type and click add button to add a new question
        </label>
        <div className="action-wrapper">
          <DropdownList
            placeholder="Select a question type"
            textField="question_type"
            dataKey="id"
            filter="contains"
            name={type}
            data={question_type}
            onChange={setQuestionType}
          />
          <button
            type="button"
            className="common-btn-style"
            onClick={addNewQuestion}
          >
            Add
          </button>
        </div>
      </div>
      <div className="form-footer">
        <button className="common-btn-style submit-btn" type="submit">
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
    </form>
  );
};

export default CustomFeedbackForm;
