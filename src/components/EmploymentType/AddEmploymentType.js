import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./EmploymentType.module.css";
import { useNavigate } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";
import { employmentTypeService } from "../../services/employmentTypeService";

function AddEmploymentType() {
  // sets new state
  const [employmenttype, setEmploymentType] = useState({
    id: "",
    employmentTypeName: "",
  });
  const dispatch = useDispatch();

  //uses to check if it is new entry or record to be updated
  const isCreating = useSelector((state) => state.emptypes.isCreating);

  //gets record to be edited
  const emptype = useSelector((state) => state.emptypes.employmenttype);

  const navigate = useNavigate();
  //get all data
  // const employmenttypes = useSelector(
  //   (state) => state.emptypes.employmenttypes
  // );

  // const [DataisLoaded, setDataisLoaded] = useState(false);

  // const employmenttypeInputRef = useRef();

  // const handleChange = (e) => {
  //   setEmploymentType({
  //     ...employmenttype,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(value);
  //   setEmploymentType((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  function handleChangeEmploymentType(e) {
    setEmploymentType({
      ...employmenttype,
      employmentTypeName: e.target.value,
    });
    //console.log(employmenttype);
  }

  useEffect(() => {
    // if (!isCreating) {
    //   setNewEmploymentType(employmenttype.employmentTypeName);
    // }

    if (!isCreating) {
      //console.log("TGGGGGG");

      // setNewEmploymentType((newEmploymentType) => ({
      //   ...newEmploymentType,
      //   ...employmenttype,
      // }));

      // setEmploymentType((prevState) => ({
      //   ...prevState,
      //   employmenttype: emptype,
      // }));

      // setNewEmploymentType({ ...newEmploymentType, id: employmenttype.id });
      // setNewEmploymentType({
      //   ...newEmploymentType,
      //   employmenttypename: employmenttype.employmentTypeName,
      // });

      setEmploymentType((existingValues) => ({
        // Retain the existing values
        ...existingValues,
        // update the id
        id: emptype.id,
        employmentTypeName: emptype.employmentTypeName,
      }));

      // setNewEmploymentType((existingValues) => ({
      //   // Retain the existing values
      //   ...existingValues,
      //   // update the id
      //   employmenttypename: employmenttype.employmentTypeName,
      // }));

      // setState((prevState) => ({ ...prevState, b: "Mary" }));
    }
  }, []);

  function submithandler(event) {
    event.preventDefault();

    // const enteredEmploymenttype = employmenttypeInputRef.current.value;
    //const { enteredEmploymenttype } = employmenttype;

    // Destructuring the state object to extract "count" and "message"
    const { id, employmentTypeName } = employmenttype;

    const EmploymentType = {
      EmploymentTypeName: employmentTypeName,
    };
    //console.log({ EmploymentType });
    if (isCreating) {
      //sending data
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Saving data",
          type: "warning",
        })
      );

      employmentTypeService
        .create(EmploymentType)
        .then((data) => {
          //Data saved succesfully
          dispatch(
            uiActions.showNotification({
              open: true,
              message: "Saved data successfully!",
              type: "success",
            })
          );

          navigate("/emptypetable");
        })
        .catch((error) => {
          //Failed to save
          dispatch(
            uiActions.showNotification({
              open: true,
              message: "Saving data failed!",
              type: "error",
            })
          );
        });

      // fetch("http://localhost:5116/api/EmploymentType", {
      //   method: "POST",
      //   body: JSON.stringify(EmploymentType),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // })
      //   .then((response) => response.json())
      // .then((data) => {
      //   //Data saved succesfully
      //   dispatch(
      //     uiActions.showNotification({
      //       open: true,
      //       message: "Saved data successfully!",
      //       type: "success",
      //     })
      //   );

      //   navigate("/emptypetable");
      // })
      // .catch((error) => {
      //   //Failed to save
      //   dispatch(
      //     uiActions.showNotification({
      //       open: true,
      //       message: "Saving data failed!",
      //       type: "error",
      //     })
      //   );
      // });
    } else {
      // fetch(`http://localhost:5116/api/EmploymentType/${emptype.id}`, {
      //   method: "PUT",
      //   body: JSON.stringify(employmenttype),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      //updating data
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Updating data",
          type: "warning",
        })
      );

      employmentTypeService
        .edit(employmenttype)
        .then((data) => {
          //Data updated succesfully
          dispatch(
            uiActions.showNotification({
              open: true,
              message: "Updated data successfully!",
              type: "success",
            })
          );

          navigate("/emptypetable");
        })
        .catch((error) => {
          //Failed to save
          dispatch(
            uiActions.showNotification({
              open: true,
              message: "Updating failed!",
              type: "error",
            })
          );
        });
    }
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
          {/* <p>Name: {name}</p> */}
          <input
            type="text"
            required
            id="employmentTypeName"
            value={employmenttype.employmentTypeName}
            // onChange={(e) => handleChange(e)}
            onChange={handleChangeEmploymentType}
            // onChange={(e) => setNewEmploymentType(e.target.value)}
            placeholder="Add Employment type here..."
          />
        </div>

        <div className={classes.actions}>
          <button>{isCreating ? "Add" : "Update"}</button>
        </div>
      </form>
    </div>
  );
}

export default AddEmploymentType;
