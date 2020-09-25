import React, {useState} from "react";
import { Route, Redirect } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Profile from "../../pages/profile/Profile";
function PrivateRoute(props) {
  const token = localStorage.getItem("token");
  const admin = localStorage.getItem("admin");
  // const [uploadRefresh, setUploadRefresh ] = useState(false);
  // const trigger = () => {
  //   uploadRefresh? setUploadRefresh(false) : setUploadRefresh(true)
  // }

  if (token) {
      return (
        <Route
          path={props.path}
          component={() => (
            <>
              {props.component !== Profile ? <Navbar backgroundImgTrue={true}></Navbar>:null }
              {/* <props.component setUploadRefresh={trigger}/> */}
              <props.component />

            </>
          )}
        />
      )
    }
    else {
      return <Redirect to="/" />;
    }
  
}

export default PrivateRoute;
