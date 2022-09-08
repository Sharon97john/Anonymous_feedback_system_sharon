import React, { useState, useEffect } from "react";
import SearchDepartment from "./SearchDepartment";
import DepartmentListWrapper from "./DepartmentListWrapper";
import "./Content.scss";
import { getDepartmentList } from "../api";
import Popup from "reactjs-popup";
import GeneralFeedbackForm from "./GeneralFeedbackForm";
import { useNavigate } from "react-router-dom";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Content = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    callDepartmentList();
  }, []);

  const closeModal = () => {
    setOpen(false);
  };
  const openModal = (e) => {
    setOpen(true);
  };
  const callDepartmentList = async (department_name = "All") => {
    props.toggleLoader(true);
    try {
      const local_data = JSON.parse(localStorage.getItem("userdata"));
      let data = {
        department: department_name,
        isAdmin: local_data.isAdmin,
        department_id: local_data.department.id,
      };
      let response = await getDepartmentList(data);
      if (local_data.isAdmin || department_name != "All") {
        setDepartments(response.data);
      } else {
        response.data = [local_data.department, ...response.data];
        setDepartments(response.data);
      }
    } catch (err) {
    } finally {
      props.toggleLoader(false);
    }
  };

  const openAdminPage = (e) => {
    const department = JSON.parse(localStorage.getItem("userdata")).department;
    navigate("/adminHome", { state: department });
  };

  return (
    <div className="content-container">
      <SearchDepartment onSearchDepartment={callDepartmentList} />
      <div className="pop-wrap">
        <button
          type="button"
          onClick={openAdminPage}
          className="general-feedback-btn"
        >
          Go to Your Department Home
        </button>
        <button
          type="button"
          onClick={openModal}
          className="general-feedback-btn"
        >
          Give a General Feedback
        </button>
        <Popup open={open} closeOnDocumentClick={false} modal nested>
          <div className="model-wrapper">
            <GeneralFeedbackForm
              departments={departments}
              responseReceived={props.showToaster}
              toggleLoader={(e) => props.toggleLoader(e)}
              onClose={closeModal}
            />
          </div>
        </Popup>
      </div>
      <div className="dept-list-container">
        <div className="legend-wrap">
          <div className="legend">
            <div className="salt-academic">
              <FontAwesomeIcon icon={faSquare} />
              <span>Academic</span>
            </div>
          </div>
          <div className="legend">
            <div className="salt-prof-ser">
              <FontAwesomeIcon icon={faSquare} />
              <span>Professional services</span>
            </div>
          </div>
          <div className="legend">
            <div className="salt-ser-fac">
              <FontAwesomeIcon icon={faSquare} />
              <span>Services and facilities</span>
            </div>
          </div>
        </div>
        <DepartmentListWrapper departments={departments} />
      </div>
    </div>
  );
};

export default Content;
