import React, { useState, useEffect } from "react";
import "./AdminHome.scss";
import CustomFeedbackCard from "./CustomFeedbackCard";
import CustomFeedbackForm from "./CustomFeedbackForm";
import VotingFormCard from "./VotingFormCard";
import CustomForm from "./CustomForm";
import CustomVotingForm from "./CutomVotingForm";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import DisplayVotingForm from "./DisplayVotingForm";
import ChartPopUp from "./ChartPopUp";
import {
  getForms,
  deleteCustomForm,
  getVotingForms,
  deleteVotingForm,
  publishFormApi,
  getDataAnalysisApi,
} from "../api";
const AdminHome = (props) => {
  const navigate = useNavigate();
  const data = useLocation();
  const department = data.state;
  const local_data = JSON.parse(localStorage.getItem("userdata"));
  const isAdmin =
    local_data.isAdmin && department.id == local_data.department.id;
  const [open, setOpen] = useState(false);
  const [dataTitle, setDataTitle] = useState(false);
  const [dataAnalysis, setDataAnalysis] = useState([]);
  const [openNewForm, setNewFormOpen] = useState(false);
  const [OpenVotingModal, setOpenVotingModal] = useState(false);
  const [openNewVotingForm, setNewVotingFormOpen] = useState(false);
  const [OpenAnalysis, setOpenAnalysis] = useState(false);
  const [form, setForm] = useState({});
  const [feedbacks, setFeedback] = useState([]);
  const [votingFeedbacks, setVotingFeedback] = useState([]);
  const formType = {
    send: 1,
    create: 2,
  };
  useEffect(() => {
    getDepartmentForms();
    getDepartmentVotingForms();
  }, []);

  const getDepartmentForms = async () => {
    props.toggleLoader(true);
    try {
      let response = await getForms(department.id, isAdmin);
      setFeedback(response.data.data);
    } catch (err) {
    } finally {
      props.toggleLoader(false);
    }
  };
  const getDataAnalysis = async (item) => {
    props.toggleLoader(true);
    try {
      let response = await getDataAnalysisApi({ feedback_id: item.id });
      debugger;
      setDataAnalysis(response.data.data);
      setOpenAnalysis(true);
      setDataTitle(item.title);
    } catch (err) {
    } finally {
      props.toggleLoader(false);
    }
  };
  const getDepartmentVotingForms = async () => {
    props.toggleLoader(true);
    try {
      let response = await getVotingForms(department.id, isAdmin);
      setVotingFeedback(response.data.data);
    } catch (err) {
    } finally {
      props.toggleLoader(false);
    }
  };
  const viewAllDepartments = (e) => {
    navigate("/userHome");
  };
  const closeModal = (e, type) => {
    if (type === formType["send"]) {
      setOpen(false);
    } else {
      setNewFormOpen(false);
      getDepartmentForms();
    }
  };
  const openModal = (e, type, form) => {
    if (type === formType["send"]) {
      setOpen(true);
      setForm(form);
    } else {
      setForm(form);
      setNewFormOpen(true);
    }
  };
  const closeChartModal = (e) => {
    setOpenAnalysis(false);
  };
  const closeVotingModal = (e, type) => {
    if (type === formType["send"]) {
      setOpenVotingModal(false);
    } else {
      setNewVotingFormOpen(false);
      getDepartmentVotingForms();
    }
  };
  const openVotingModal = (e, type, form) => {
    if (type === formType["send"]) {
      setOpenVotingModal(true);
      setForm(form);
      console.log(form);
    } else {
      setForm(form);
      console.log(form);
      setNewVotingFormOpen(true);
    }
  };
  const deleteForm = async (id) => {
    props.toggleLoader(true);
    try {
      let response = await deleteCustomForm(id);
      if (response && response.data) {
        response = response.data;
        props.showToaster({
          status: response.status,
          message: response.message,
        });
        getDepartmentForms();
      }
    } catch (err) {
      props.showToaster({
        status: false,
        message: "Some went wrong. Try again !",
      });
    } finally {
      props.toggleLoader(false);
    }
  };
  const deleteVotingFormApi = async (id) => {
    props.toggleLoader(true);
    try {
      let response = await deleteVotingForm(id);
      if (response && response.data) {
        response = response.data;
        props.showToaster({
          status: response.status,
          message: response.message,
        });
        getDepartmentVotingForms();
      }
    } catch (err) {
      props.showToaster({
        status: false,
        message: "Some went wrong. Try again !",
      });
    } finally {
      props.toggleLoader(false);
    }
  };
  const publishForm = async (key, id) => {
    props.toggleLoader(true);
    try {
      const data = {
        key: key,
        id: id,
      };

      let response = await publishFormApi(data);
      if (response && response.data) {
        response = response.data;
        props.showToaster({
          status: response.status,
          message: response.message,
        });
      }
      if (key == "suggestion") {
        getDepartmentVotingForms();
      } else {
        getDepartmentForms();
      }
    } catch (err) {
      props.showToaster({
        status: false,
        message: "Some went wrong. Try again !",
      });
    } finally {
      props.toggleLoader(false);
    }
  };
  return (
    <div className="container-fluid p-0 pt-4 m-0 department-home">
      <div className="row p-0 m-0">
        <div className="col-12 p-0 m-0 text-center">
          <h3>{department?.department_name || props.data}</h3>
        </div>
        <div className="col-12 pop-wrap">
          <button
            type="button"
            onClick={viewAllDepartments}
            className="common-btn-style custom-btn"
          >
            View All Departments
          </button>
        </div>
        <div className="col-12 p-4 feedback-list-wrap">
          <div className="title-header">
            <div className="heading-btn-wrap">
              {!isAdmin ? "Give us your feedback !" : "Feedback Forms"}
              {isAdmin && (
                <div>
                  <button
                    type="button"
                    onClick={(e) => openModal(e, formType["create"], null)}
                    className="common-btn-style custom-btn"
                  >
                    <FontAwesomeIcon className="fa-icon" icon={faPlus} />
                    Create New Feedback Form
                  </button>
                  <Popup
                    open={openNewForm}
                    closeOnDocumentClick={false}
                    modal
                    nested
                  >
                    <div className="model-wrapper">
                      <CustomFeedbackForm
                        formDetails={form}
                        responseReceived={props.showToaster}
                        onClose={(e) => closeModal(e, formType["create"])}
                        toggleLoader={(e) => props.toggleLoader(e)}
                      />
                    </div>
                  </Popup>
                </div>
              )}
            </div>
            <div className="title-border-feedback"></div>
          </div>
          <div className="cards-list-wrapper">
            {feedbacks.length > 0 &&
              feedbacks.map((item) => {
                return (
                  <CustomFeedbackCard
                    key={item.id}
                    title={item.title}
                    is_published={item.is_published}
                    isAdmin={isAdmin}
                    createFeedbackClicked={(e) =>
                      openModal(e, formType["send"], item)
                    }
                    editClicked={(e) => openModal(e, formType["create"], item)}
                    deleteClicked={(e) => deleteForm(item.id)}
                    publishedClicked={(e) => publishForm("feedback", item.id)}
                    getAnalysis={(e) => getDataAnalysis(item)}
                  />
                );
              })}

            {feedbacks.length == 0 && (
              <strong>No Feedback Forms Found...</strong>
            )}
          </div>
        </div>
        <div className="col-12 p-4 feedback-list-wrap">
          <div className="title-header">
            <div className="heading-btn-wrap">
              {!isAdmin ? "Give us your vote !" : "Suggestions"}
              {isAdmin && (
                <div>
                  <button
                    type="button"
                    onClick={(e) =>
                      openVotingModal(e, formType["create"], null)
                    }
                    className="common-btn-style custom-btn"
                  >
                    <FontAwesomeIcon className="fa-icon" icon={faPlus} />
                    Create New Suggestion
                  </button>
                  <Popup
                    open={openNewVotingForm}
                    closeOnDocumentClick={false}
                    modal
                    nested
                  >
                    <div className="model-wrapper">
                      <CustomVotingForm
                        formDetails={form}
                        responseReceived={props.showToaster}
                        onClose={(e) => closeVotingModal(e, formType["create"])}
                        toggleLoader={(e) => props.toggleLoader(e)}
                      />
                    </div>
                  </Popup>
                </div>
              )}
            </div>
            <div className="title-border-vote"></div>
          </div>
          <div className="cards-list-wrapper">
            {votingFeedbacks.length > 0 &&
              votingFeedbacks.map((item) => {
                return (
                  <VotingFormCard
                    key={item.id}
                    form={item}
                    isAdmin={isAdmin}
                    responseReceived={props.showToaster}
                    createFeedbackClicked={(e) =>
                      openVotingModal(e, formType["send"], item)
                    }
                    updateCount={(e) => getDepartmentVotingForms()}
                    editClicked={(e) =>
                      openVotingModal(e, formType["create"], item)
                    }
                    deleteClicked={(e) => deleteVotingFormApi(item.id)}
                    publishedClicked={(e) => publishForm("suggestion", item.id)}
                    toggleLoader={(e) => props.toggleLoader(e)}
                  />
                );
              })}

            {votingFeedbacks.length == 0 && (
              <strong>No Suggestions Found...</strong>
            )}
          </div>
        </div>
      </div>
      <div className="row p-0 m-0">
        <Popup open={open} closeOnDocumentClick={false} modal nested>
          <div className="model-wrapper">
            <CustomForm
              formDetails={form}
              responseReceived={props.showToaster}
              toggleLoader={(e) => props.toggleLoader(e)}
              onClose={(e) => closeModal(e, formType["send"])}
            />
          </div>
        </Popup>
      </div>
      <div className="row p-0 m-0">
        <Popup open={OpenVotingModal} closeOnDocumentClick={false} modal nested>
          <div className="model-wrapper">
            <DisplayVotingForm
              formDetails={form}
              onClose={(e) => closeVotingModal(e, formType["send"])}
            />
          </div>
        </Popup>
      </div>
      <div className="row p-0 m-0">
        <Popup open={OpenAnalysis} closeOnDocumentClick={false} modal nested>
          <div className="model-wrapper">
            <ChartPopUp
              dataAnalysis={dataAnalysis}
              dataTitle={dataTitle}
              onClose={(e) => closeChartModal(e)}
            />
          </div>
        </Popup>
      </div>
    </div>
  );
};
export default AdminHome;
