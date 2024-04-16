import React from "react";
import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userAccountService } from "../../../services/useraccountService";
import { useNavigate, useParams } from "react-router-dom";
import { uiActions } from "../../../store/ui-slice";

const Email_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function RegisterEdit() {
  // const userRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const fnameRef = useRef();
  // const errRef = useRef();
  // const [isCreating, setIsCreating] = useState(true);

  const [fname, setFname] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [fnameFocus, setFnameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const { id } = useParams();
  const emailval = email;

  useEffect(() => {
    if (id > 0) {
      //console.log(id);

      userAccountService
        .getbyId(id)
        .then((result) => {
          // console.log(result);
          setFname(result.fullName);
          //  setUser(result.userName);
          setEmail(result.email);
          setValidEmail(Email_REGEX.test(result.email));
          // console.log(emailval);
          // console.log(email.toString());
          // setPwd(result.password);
          // setMatchPwd(result.password);
        })
        .catch((error) => {});
      // setIsCreating(false);
    }
  }, []);

  useEffect(() => {
    setValidEmail(Email_REGEX.test(email));
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const UserAccount = {
      Id: id,
      FullName: fname,
      Email: email,
    };

    userAccountService
      .editprofile(UserAccount, id)
      .then((data) => {
        dispatch(
          uiActions.showNotification({
            open: true,
            message: "Updated data successfully!",
            type: "success",
          })
        );
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

    navigate("/RegisterTable");
  };

  return (
    <div className="App-section">
      <section>
        <h4>Edit User Profile</h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullname">
            Full name:
            <FontAwesomeIcon
              icon={faCheck}
              className={fname && fname.length >= 6 ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={!fname || fname.length >= 6 ? "hide" : "invalid"}
            />
          </label>
          <input
            type="text"
            id="fullname"
            // ref={fnameRef}
            minLength="6"
            pattern="[a-zA-Z ]+"
            autoComplete="off"
            onChange={(e) => setFname(e.target.value)}
            value={fname}
            required
            aria-invalid={!fname ? "false" : "true"}
            aria-describedby="uidfullname"
            onFocus={() => setFnameFocus(true)}
            onBlur={() => setFnameFocus(false)}
          />
          <p
            id="uidfullname"
            className={
              fnameFocus && fname && fname.length < 6
                ? "instructions"
                : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Full Name is required.
            <br />
            Minimum of 6 character length.
          </p>

          <label htmlFor="email">
            Email:
            <FontAwesomeIcon
              icon={faCheck}
              className={validEmail ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validEmail || !email ? "hide" : "invalid"}
            />
          </label>

          <input
            type="email"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="uidemail"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />

          <p
            id="uidemail"
            className={
              emailFocus && email && !validEmail ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Email is required.
            <br />
            Invalid email
          </p>

          <button
            className={
              // isCreating &&
              !fname || fname.length < 6 || !validEmail
                ? "btn btn-success disabled"
                : "btn btn-success"
            }
          >
            Update
          </button>
        </form>
      </section>
    </div>
  );
}

export default RegisterEdit;
