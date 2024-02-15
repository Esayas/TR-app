import React, { useEffect, useState, useRef, useParams } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

import classes from "./EmploymentType.module.css";

function AddEmploymentType() {
  const [newEmploymentType, setNewEmploymentType] = useState("");

  const navigate = useNavigate();
  // const [inputText, setInputText] = useState({
  //   id: "",
  //   title: "",
  // });

  // const [DataisLoaded, setDataisLoaded] = useState(false);

  // const employmenttypeInputRef = useRef();

  // const onChange = (e) => {
  //   setInputText({
  //     ...inputText,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  const queryParameters = new URLSearchParams(window.location.search);

  const name = queryParameters.get("id");

  useEffect(() => {
    // const url = window.location.href;
    // const params = new URL(url).searchParams;
    // const empid = params.get("id");
    // if (empid > 0) {
    //   gethandler(empid);
    // } else {
    //   setInputText({
    //     title: "",
    //     id: "",
    //   });
    // }
  }, []);

  function submithandler(event) {
    event.preventDefault();
    console.log(newEmploymentType);
    // const enteredEmploymenttype = employmenttypeInputRef.current.value;
    const enteredEmploymenttype = newEmploymentType.trim();

    const EmploymentType = {
      EmploymentTypeName: enteredEmploymenttype,
    };

    fetch("http://localhost:5116/api/EmploymentType", {
      method: "POST",
      body: JSON.stringify(EmploymentType),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNewEmploymentType("");

        navigate("/emptypetable");
      });
  }

  // function submithandler(event) {
  //   event.preventDefault();
  //   const enteredEmploymenttype = employmenttypeInputRef.current.value;

  //   const EmploymentType = {
  //     EmploymentTypeName: enteredEmploymenttype,
  //   };

  //   fetch(
  //     "http://localhost:5116/api/EmploymentType",

  //     {
  //       method: "POST",
  //       body: JSON.stringify(EmploymentType),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   ).then(() => {});

  //   //props.onAddMeetup(enteredEmploymenttype);
  // }

  return (
    <div>
      <form className={classes.form} onSubmit={submithandler}>
        <div className={classes.control}>
          <label htmlFor="employmenttype">Employment Type</label>
          <p>Name: {name}</p>
          <input
            type="text"
            required
            id="employmenttype"
            value={newEmploymentType}
            onChange={(e) => setNewEmploymentType(e.target.value)}
            placeholder="Add Employment type here..."
          />
        </div>

        <div className={classes.actions}>
          <button>Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddEmploymentType;
