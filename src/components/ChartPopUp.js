import React, { useState, useEffect, useRef } from "react";
import "./FeedbackFormCommonStyle.scss";
import "./CustomFeedbackForm.scss";
import CommonChartComponent from "./CommonChartComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactToPrint from "react-to-print";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
const tabStyle = {
  // height: 500,
  maxHeight: 450,
  overflow: "scroll",
};
class ChartPopUpPrintable extends React.Component {
  closeModal = () => {
    this.props.onClose(true);
  };

  render() {
    return (
      <div className="feedbk-form-wrapper cutom-feedback-wrapper chart-wrapper">
        <div style={tabStyle}>
          <div className="" ref={this.props.propsRef}>
            <div className="form-header" style={{ padding: "5px" }}>
              <h4>{this.props?.dataTitle}</h4>
            </div>
            {this.props?.dataAnalysis?.length > 0 &&
              this.props?.dataAnalysis?.map((item, index) => {
                return (
                  <div
                    className="chart-cont printElement1"
                    style={{ borderBottom: "1px solid #000" }}
                    key={item.id}
                  >
                    <CommonChartComponent title={item.title} question={item} />
                  </div>
                );
              })}
            {this.props?.dataAnalysis?.length == 0 && (
              <strong className="text-center">
                No answers submitted or no data to analyze. Please check back
                later !
              </strong>
            )}
          </div>
        </div>
        <div className="form-footer">
          <button
            type="button"
            className="common-btn-style cancel-btn"
            onClick={this.closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

const pageStyling = {
  padding: 10,
};
class ChartPopUp extends React.Component {
  closeModal = () => {
    this.props.onClose(true);
  };
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => (
            <div className="print-btn-wrap">
              <button className="common-btn-style"><FontAwesomeIcon icon={faPrint} /> Print</button>
            </div>
          )}
          content={() => this.componentRef}
          bodyClass={"printElement1"}
        />
        <ChartPopUpPrintable
          dataAnalysis={this.props.dataAnalysis}
          dataTitle={this.props.dataTitle}
          onClose={(e) => this.closeModal(e)}
          propsRef={(el) => (this.componentRef = el)}
        />
      </div>
    );
  }
}

// export default Example;
export default ChartPopUp;
