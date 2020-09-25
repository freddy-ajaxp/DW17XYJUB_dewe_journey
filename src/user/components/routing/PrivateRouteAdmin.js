import React from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Profile from "../../pages/profile/Profile";
function PrivateRoute(props) {
  const token = localStorage.getItem("token");
  const admin = localStorage.getItem("admin");
  if (token) {
    if (admin === "true") {

      // return<Route path = {props.path} components={{Navbar:Profile, Profile:props.component.Profile}} />
      //  return <Route path = {props.path} component= {props.component.Profile} />

      return (
        <Route
          path={props.path}
          component={() => (
            <div>
              <Navbar />
              <props.component />
            </div>
          )}
        />
      );
    } else {
      return <Redirect to="/" />;
    }
  }
  return <Redirect to="/" />;
}

export default PrivateRoute;
