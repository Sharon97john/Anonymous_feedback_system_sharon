import React from "react";
import DepartmentCard from "./DepartmentCard";
import "./DepartmentListWrapper.scss";
import { useNavigate } from "react-router-dom";

const DepartmentListWrapper = (props) => {
  const navigate = useNavigate();
  const openPage = (event, department) => {
    navigate("/adminHome", { state: department });
  };
  return (
    <div className="container-fluid p-0 m-0 grid">
      <div className="row p-0 m-0">
        <div className="col-12 department-list-wrap">
          {props.departments.length > 0 &&
            props.departments.map((item, index) => {
              return (
                <div
                  key={item.id}
                  onClick={(event) => openPage(event, item)}
                >
                  <DepartmentCard department={item} />
                </div>
              );
            })}
          {props.departments.length == 0 && <strong>No departments loaded</strong>}
        </div>
      </div>
    </div>
  );
};
export default DepartmentListWrapper;
