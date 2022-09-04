import "./App.scss";
import Header from "./components/Header";
// import Footer from "./components/Footer";
import AdminHome from "./components/AdminHome";
import Content from "./components/Content";
import LoginPage from "./components/LoginPage";
import React, { useState, useEffect } from "react";
import AutohideToaster from "../src/components/CommonToaster";
import { BallTriangle } from "react-loader-spinner";
import {
  Route,
  Routes,
  // Navigate,
  useLocation,
  BrowserRouter as Router,
} from "react-router-dom";
import GuardedRoute from "./components/GuardedRoute";
function App() {
  const [isShow, setShow] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isLoginPage, setLoginPage] = useState(true);
  const [content, setContent] = useState({
    heading: "Test",
    status: "success",
    message: "gjglkjalkfjalsjfl !!!",
  });
  const showToaster = (e) => {
    setContent({
      heading: e.status ? "Success" : "Error",
      status: e.status ? "success" : "danger",
      message: e.message,
    });
    setShow(true);
  };
  useEffect(() => {
    const location = window.location.pathname;
    if (location != "/") {
      setLoginPage(false);
    } else {
      setLoginPage(true);
    }
  }, []);

  const hideToaster = (e) => {
    setShow(e);
  };
  const togglingLoader = (e) => {
    const time = e ? 0 : 500;
    setTimeout(() => {
      setShowLoader(e);
    }, time);
  };
  return (
    <Router>
      <AutohideToaster
        isShow={isShow}
        content={content}
        closeToaster={hideToaster}
      />
      {showLoader && (
        <div className="common-loader">
          <BallTriangle type="ThreeDots" ariaLabel = 'Loading...' color="#ffec59" height="200" width="100" />
        </div>
      )}
      {!isLoginPage && <Header setLoginPage={(e) => setLoginPage(e)} />}
      <Routes>
        <Route
          exact
          path="/"
          element={
            <LoginPage
              showToaster={showToaster}
              setLoginPage={(e) => setLoginPage(e)}
              toggleLoader={(e) => togglingLoader(e)}
            />
          }
        />
        <Route
          path="/userHome"
          element={
            <GuardedRoute>
              <Content
                showToaster={showToaster}
                toggleLoader={(e) => togglingLoader(e)}
              />
            </GuardedRoute>
          }
        />
        <Route
          path="/adminHome"
          element={
            <GuardedRoute>
              <AdminHome
                showToaster={showToaster}
                toggleLoader={(e) => togglingLoader(e)}
              />
            </GuardedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
