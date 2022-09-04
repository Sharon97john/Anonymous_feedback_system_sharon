import React from "react";
import "./FeedbackFormCommonStyle.scss";
import { useForm } from "react-hook-form";
import { saveCustomFeedbackApi, sendFeedback } from "../api";
const CustomForm = (props) => {
  const { register, handleSubmit } = useForm();
  // const onSubmit = (data) => {
  //   sendFeedbackForm(data);
  // };
  const isAdmin = JSON.parse(localStorage.getItem("userdata")).isAdmin;
  const closeModal = () => {
    props.onClose(true);
  };
  const sendFeedbackForm = (data) => {
    let message =
      "You have received the following feedback for " +
      props.formDetails.title +
      ". \n\n";
    let user_feedback = {
      department_id: props.formDetails.department_id,
      user_id: JSON.parse(localStorage.getItem("userdata")).id,
    };
    let form = [];
    for (const [key, value] of Object.entries(data)) {
      const item = props.formDetails.form.filter((item) => item.id == key)[0];
      if (typeof value === "string" || value instanceof String) {
        let temp = {
          question: item.id,
          answer: value,
          is_option: item.isOption,
          option_id: item.isOption
            ? item.options.filter((option) => option.description == value)[0].id
            : "",
        };
        form = [temp, ...form];
      } else {
        value.forEach((val) => {
          let temp = {
            question: item.id,
            answer: val,
            is_option: item.isOption,
            option_id: item.isOption
              ? item.options.filter((option) => option.description == val)[0].id
              : "",
          };
          form = [temp, ...form];
        });
      }
    }
    // delete user_feedback["description"]
    user_feedback["form"] = form;
    user_feedback["feedback_id"] = props.formDetails.id;
    saveCustomFeedbackAnswers(user_feedback);
  };
  const saveCustomFeedbackAnswers = async (user_feedback) => {
    props.toggleLoader(true);
    try {
      let response = await saveCustomFeedbackApi(user_feedback);
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
  const sendFeedbackMail = async (user_feedback) => {
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
    <form onSubmit={handleSubmit(sendFeedbackForm)}>
      <div className="feedbk-form-wrapper">
        <div className="form-header">
          <h4>{props.formDetails.title}</h4>
        </div>

        <div className="form-body">
          <div>{props.formDetails.description}</div>
          {props.formDetails.form.map((item, index) => {
            return (
              <div className="m-2" key={item.id}>
                <label>
                  {index + 1}. {"\n"}
                  {item.description}
                </label>
                {item.question_type === 1 && (
                  <input {...register(`${item.id}`)} type="text" />
                )}
                {item.question_type !== 1 &&
                  item.isOption &&
                  item.options.map((op) => {
                    return (
                      <div key={op.id}>
                        <div className="checkbox-item">
                          <input
                            type={
                              item.question_type === 2 ? "radio" : "checkbox"
                            }
                            value={op.description}
                            name={item.id}
                            {...register(`${item.id}`)}
                          />
                          {op.description}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
        {!isAdmin && (
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
        )}
        {isAdmin && (
          <div className="form-footer">
            <button
              type="button"
              className="common-btn-style cancel-btn"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </form>
  );
};
export default CustomForm;
