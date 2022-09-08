import React from "react";
import "./CustomFeedbackCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
// import { faChartBar } from "@fortawesome/free-solid-svg-icons";
import { updateVotingCount } from "../api";

const VotingFormCard = (props) => {
  const likeClicked = async (key) => {
    props.toggleLoader(true);
    try {
      const data = {
        key: key,
        id: props.form.id,
        count:
          key == "like"
            ? props.form.like_count + 1
            : props.form.dislike_count + 1,
      };

      let response = await updateVotingCount(data);
      if (response && response.data) {
        response = response.data;
        props.responseReceived({
          status: response.status,
          message: response.message,
        });
      }
      props.updateCount(true);
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
    <div className="cutom-voting-card col-3">
      <div
        className="title"
        title={props.isAdmin ? "View Preview" : "View Description"}
        onClick={() => props.createFeedbackClicked()}
      >
        {props.form.title}
      </div>
      {props.isAdmin && (
        <div>
          <div className="admin-icons-wrapper">
            <div title="Like Count" className="admin-icon-item-unclickable">
              <FontAwesomeIcon icon={faThumbsUp} />
              <div className="count-nmbr">{props.form.like_count}</div>
            </div>
            <div title="Dislike Count" className="admin-icon-item-unclickable">
              <FontAwesomeIcon icon={faThumbsDown} />
              <div className="count-nmbr">{props.form.dislike_count}</div>
            </div>
            <div className="more-icon admin-icon-item">
              <div>
                <FontAwesomeIcon icon={faEllipsisV} />
              </div>
              <div className="more-contents">
                {!props.form.is_published && (
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
              </div>
            </div>
          </div>
        </div>
      )}
      {!props.isAdmin && (
        <div className="admin-icons-wrapper">
          <div
            title="Like"
            className="admin-icon-item"
            onClick={() => likeClicked("like")}
          >
            <div className="count-nmbr">{props.form.like_count}</div>
            <FontAwesomeIcon icon={faThumbsUp} />
          </div>
          <div
            title="Dislike"
            className="admin-icon-item"
            onClick={() => likeClicked("dislike")}
          >
            <div className="count-nmbr">{props.form.dislike_count}</div>
            <FontAwesomeIcon icon={faThumbsDown} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingFormCard;
