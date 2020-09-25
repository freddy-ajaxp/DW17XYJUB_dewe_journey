import axios from "axios";
import React, {
  useEffect,
  useState,
  Component,
  ReactPropTypes,
  useCallback,
} from "react";
import {useForm} from "react-hook-form";
import { MemoryRouter, Switch, Route, useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Alert, Button, Form, InputGroup, FormControl, Image } from "react-bootstrap";
import parse from "html-react-parser";
import { ErrorMessage } from "@hookform/error-message"; //form validation
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";


//import CK5
// import CKEditor from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import simpleuploadadapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
//CK4
import CKEditor from "ckeditor4-react";
import './addtrip.css';

const Home = () => {
  //START COUNTRY INITIALIZATION PART
  const [countryList, setcountryList] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    content: "",
  });
  const [picture, setPicture] = useState(null);
  const history = useHistory();
  const [alertShow, setAlertShow] = useState({status:false, message:""});
  const schema = yup.object().shape({
    title: yup.string().required("kolom wajib diisi"),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  
  const onChangePicture = (e) => {
    if (e.target.files[0]) {
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setForm({ ...form, ["image"]: reader.result });
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const submitHandler = (e) => {
    // e.preventDefault();

      const formData = new FormData();
      formData.append("idUser", localStorage.getItem('id'));
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("content", form.content);
      formData.append("image", picture);
      const token = JSON.parse(localStorage.getItem("token"));
      // const requestOptions = {
      //   method: "POST",
      //   // headers: { "content-type": "multipart/form-data" },        
      //   body: formData,
      // };

      axios
      .post("http://localhost:5002/api/upload", formData)
      .then((res) => {
        history.push({
          pathname: "/Profile",
        });
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          setAlertShow({stats:true, message:err.response.data.message})
        } else if (err.request) {
          console.log(err);
          setAlertShow({stats:true, message:"terjadi kesalahan dalam mengirim data, hubungi admin"})
        } else {
          console.log(err);
          setAlertShow({stats:true, message:"terjadi kesalahan, hubungi admin"})
        }
      });

      // fetch("http://localhost:5002/api/upload", requestOptions)
      //   .then(function(response) {
      //     console.log("response", response)
      //     if (!response.ok) {
      //       throw Error(response.statusText);
      //     }
      //     else {
      //       history.push("/Profile");
      //     } 
      //   })
      //   .catch(function(err) {
      //     console.log("error axios", err);
      //     setAlertShow({stats:true, message:"terjadi error saat mengirim data, pastikan seluruh data telah terisi"})
      //   });
    
    
  };

  const optionCountries = countryList.map((dataCountry) => (
    <option value={dataCountry.id} name="country_id">
      {dataCountry.nama_negara}
    </option>
  ));

 
  const onChangeCKeditor = async (e) => {
    setForm({ ...form, content: e.editor.editable().getText(), description: e.editor.getData()});
  };

  const onChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <React.Fragment>
      <Alert show={alertShow.status} onClose={() => setAlertShow({status:false})} dismissible variant="danger" >{alertShow.message}</Alert>

      <div class="container" >
        <div className="add-trip-heading"> New Journey</div>
        <hr />
        <div >
          <div >
            <form
              // onSubmit={(e) => submitHandler(e)}
              onSubmit={handleSubmit(submitHandler)}
              method="post"
              enctype="multipart/form-data"
            >
              <div class="form-group">
                <input
                  type="text"
                  name="title"
                  class="form-control"
                  placeholder="Title"
                  onChange={(e) => onChange(e)}
                  ref={register}
                />
              </div>
              {errors.title && (
            <p style={{ color: "red" }}>{errors.title.message}</p>
          )}
              <div class="form-group">
                <input type="file" name="image" onChange={onChangePicture}/>
              </div>

              <div class="form-group">
                <CKEditor
                  name = "ckeditor"
                  data="<p>Hi, you can write your experience here</p>"
                  onChange={(e) => {
                    onChangeCKeditor(e);
                  }}
                />
              </div>
              <button type="submit" class="btn btn-info">
                upload
              </button>
            </form>
          </div>
          <br></br>
          <Form.Group
            className="border"
            controlId="formGridAddress2"
            style={{ backgroundColor: "white", padding: "5rem", minWidth:"100%" }}
          >
            {parse(`${form.description}`)}
          </Form.Group>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
