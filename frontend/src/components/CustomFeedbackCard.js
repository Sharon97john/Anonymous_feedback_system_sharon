import React from "react";
import "./CustomFeedbackCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { faChartBar } from "@fortawesome/free-solid-svg-icons";

const CustomFeedbackCard = (props) => {
  return (
    <div className="custom-feedback-card col-2">
      <div
        className="title"
        title={props.isAdmin ? "View Preview" : "Click to submit feedback"}
        onClick={() => props.createFeedbackClicked()}
      >
        {props.title}
      </div>
      {props.isAdmin && (
        <div className="more-icon admin-icon-item">
          <div className="">
            <FontAwesomeIcon icon={faEllipsisV} />
          </div>
          <div className="more-contents">
            {!props.is_published && (
              <div>
                <div
                  title="Publish"
                  className="admin-icon-item"
                  onClick={() => props.publishedClicked()}
                >
                  <FontAwesomeIcon icon={faUpload} />{" "}
                  <div className="icon-text">Publish</div>
                </div>
                <div
                  title="Edit"
                  className="admin-icon-item"
                  onClick={() => props.editClicked()}
                >
                  <FontAwesomeIcon icon={faFilePen} />{" "}
                  <div className="icon-text">Edit</div>
                </div>
              </div>
            )}
            <div
              title="Delete"
              className="admin-icon-item"
              onClick={() => props.deleteClicked()}
            >
              <FontAwesomeIcon icon={faTrash} />{" "}
              <div className="icon-text">Delete</div>
            </div>
            {props.is_published && (
              <div
                title="Show Charts"
                className="admin-icon-item"
                onClick={() => props.getAnalysis()}
              >
                <FontAwesomeIcon icon={faChartBar} />{" "}
                <div className="icon-text">Analysis</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomFeedbackCard;
