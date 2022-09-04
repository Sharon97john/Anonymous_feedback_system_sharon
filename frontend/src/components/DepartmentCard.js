import React from "react";
// import logo from "../assests/images/dep-card.jfif";
import "./DepartmentCard.scss";

const DepartmentCard = (props) => {
  return (
    <div className={props?.department?.department_type_id == 1 ? "academic department-card" : props?.department?.department_type_id == 2 ? "prof-ser department-card" : "ser-fac department-card"}>
      {/* <img src={logo} alt="Avatar" /> */}
      <div className="overlay">{props?.department?.department_name}</div>
    </div>
    // <div className="hex">
    //   <div className="hexIn">
    //     <a className="hexLink" href="#">
    //       <div
    //         className="img">{props.department}</div>
    //     </a>
    //   </div>
    // </div>
  );
};
export default DepartmentCard;
