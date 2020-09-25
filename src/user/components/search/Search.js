import axios from "axios";
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import {
    Form,
    InputGroup,
    FormControl,
  } from "react-bootstrap";



const Search = (props) => {
props.setTodos()
const [keyword, setKeyword] = useState();

  const searchHandler = async  (e) => {
    e.preventDefault()
    const idUser =localStorage.getItem('id');
    try {
    await axios.post("http://localhost:5002/api/search", {
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
       }
     });
    }
    catch(err){
      
    }
}

  return (
    <>
      <Container>
        <h1 style={{ textAlign: "center" }}>
          <b>Journey</b>
        </h1>
        <br />
        <Form onSubmit={(e) => searchHandler(e)}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Find Journey "
              aria-label="Input group example"
              aria-describedby="btnGroupAddon2"
              name="keyword"
              onChange={(e) => {setKeyword(e.target.value)}}
            />
            <InputGroup.Append>
              <InputGroup.Text id="btnGroupAddon2">Search</InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </Container>
    </>
  );
};

export default Search;
