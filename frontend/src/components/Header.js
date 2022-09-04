import React, { useEffect, useState } from "react";
import logo from "../assests/images/logo.png";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
const Header = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setLogin] = useState(false);
  const logout = () => {
    localStorage.clear();
    setLogin(false);
    props.setLoginPage(true);
    navigate("/");
  };
  const goToHome = () => {
    navigate("/userHome");
  };
  useEffect(() => {
    const local_data = localStorage.getItem("userdata");
    if (local_data) {
      setLogin(true);
    }
  });
  return (
    <div className="container-fluid p-0 pt-2 m-0 topnav">
      <div className="row">
        <div className="col-12 header-wrap d-flex align-items-center justify-content-between">
          <img
            alt=""
            src={logo}
            className="d-inline-block align-top university-logo"
          />
          {/* <h2>Quote It !</h2> */}
          {/* <div> */}
          {/* {isLoggedIn && ( */}
          <div className="d-flex">
            <div className="header-link-item" onClick={goToHome}>
              <FontAwesomeIcon icon={faHouse} />
              <span className="d-inline-block ps-2">Home</span>
            </div>
            <div className="header-link-item" onClick={logout}>
              <FontAwesomeIcon icon={faPowerOff} />
              <span className="d-inline-block ps-2">Logout</span>
            </div>
          </div>
          {/* )} */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};
export default Header;
