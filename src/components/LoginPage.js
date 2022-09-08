import React from "react";
import "./LoginPage.scss";
import "./FeedbackFormCommonStyle.scss";
import { useForm } from "react-hook-form";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import logo from "../assests/images/logo.png";
import loginImg from '../assests/images/s_building_12.jpeg'
const LoginPage = (props) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  // const onSubmit = (values) => console.log(values);
  const sendLoginApi = async (data) => {
    props.toggleLoader(true);
    try {
      let response = await login(data);
      if (
        response &&
        response.data &&
        response.data.result &&
        response.data.status
      ) {
        localStorage.setItem("userdata", JSON.stringify(response.data.result));
        props.setLoginPage(false);
        navigate("/userHome");
      } else {
        props.showToaster({
          status: false,
          message: "Some went wrong. Try again !",
        });
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
    <div className="login-container">
      {/* <div className="nav-bar">
        <img
            alt=""
            src={logo}
            className="d-inline-block align-top university-logo"
          />
      </div> */}
      <div className="main-container">
        <div className="login-form">
          <div className="logo-img">
            <img
              alt=""
              src={logo}
              className="d-inline-block align-top university-logo"
            />
          </div>
          <div className="form-section">
            <div className="form-wrapper">
              <h3>Login</h3>
              <label>Please enter credentials</label>
              {/* <img
            alt=""
            src={logo}
            className="d-inline-block align-top university-logo"
          /> */}
              <form onSubmit={handleSubmit(sendLoginApi)}>
                {/* <label>Username</label> */}
                <div>
                  <input
                    {...register("username")}
                    type="text"
                    placeholder="Enter Username"
                  />
                </div>
                {/* <label className="mt-2">Password</label> */}
                <div>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="Enter Password"
                  />
                </div>
                <button type="submit" className="common-btn-style login-btn">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="login-image">
          <img
            alt="login-image"
            src={loginImg}
          />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
