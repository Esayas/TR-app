import { useRef } from "react";

import classes from "./EmploymentType.module.css";

function AddEmploymentType() {
  const employmenttypeInputRef = useRef();

  function submithandler(event) {
    event.preventDefault();
    const enteredEmploymenttype = employmenttypeInputRef.current.value;

    const EmploymentType = {
      EmploymentTypeName: enteredEmploymenttype,
    };

    fetch(
      "http://localhost:5116/api/EmploymentType",

      {
        method: "POST",
        body: JSON.stringify(EmploymentType),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {});

    //props.onAddMeetup(enteredEmploymenttype);
  }

  return (
    <div>
      <form className={classes.form} onSubmit={submithandler}>
        <div className={classes.control}>
          <label htmlFor="employmenttype">Employment Type</label>
          <input
            type="text"
            required
            id="employmenttype"
            ref={employmenttypeInputRef}
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
