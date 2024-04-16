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

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const Email_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function Register() {
  const userRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const fnameRef = useRef();
  // const errRef = useRef();
  // const [isCreating, setIsCreating] = useState(true);

  const [fname, setFname] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [fnameFocus, setFnameFocus] = useState(false);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);
  // const { id } = useParams();

  useEffect(() => {
    userRef.current.focus();
    // if (id > 0) {
    //   console.log(id);
    //   setIsCreating(false);
    //   userAccountService
    //     .getbyId(id)
    //     .then((result) => {
    //       console.log(result);
    //       setFname(result.fullName);
    //       setUser(result.userName);
    //       setEmail(result.email);
    //       // setPwd(result.password);
    //       // setMatchPwd(result.password);
    //     })
    //     .catch((error) => {});
    //   // setIsCreating(false);
    // }
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(Email_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  //   useEffect(() => {
  //     setErrMsg("");
  //   }, [user, pwd, matchPwd]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const UserAccount = {
      UserName: user,
      FullName: fname,
      Email: email,
      Password: pwd,
      IsActive: true,
    };
    // if button enabled with JS hack
    // if (isCreating) {
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      //   setErrMsg("Invalid Entry");
      return;
    }

    try {
      // console.log(UserAccount);
      userAccountService
        .create(UserAccount)
        .then((data) => {
          //Data saved succesfully
          dispatch(
            uiActions.showNotification({
              open: true,
              message: "Saved data successfully!",
              type: "success",
            })
          );
          // dispatch(triptypeActions.createnew());
          navigate("/RegisterTable");
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
      // setUser("");
      // setPwd("");
      // setMatchPwd("");
    } catch (err) {
      //   if (!err?.response) {
      //     setErrMsg("No Server Response");
      //   } else if (err.response?.status === 409) {
      //     setErrMsg("Username Taken");
      //   } else {
      //     setErrMsg("Registration Failed");
      //   }
      // errRef.current.focus();
    }
    // } else {
    //   userAccountService
    //     .editprofile(UserAccount, id)
    //     .then((data) => {
    //       console.log(data);
    //     })
    //     .catch((error) => {
    //       //Failed to save
    //       dispatch(
    //         uiActions.showNotification({
    //           open: true,
    //           message: "Saving data failed!",
    //           type: "error",
    //         })
    //       );
    //     });

    //   navigate("/RegisterTable");
    // }
  };

  return (
    <div className="App-section">
      <section>
        {/* <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p> */}
        <h4>Register</h4>
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
          <label htmlFor="username">
            User name:
            <FontAwesomeIcon
              icon={faCheck}
              className={validName ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validName || !user ? "hide" : "invalid"}
            />
          </label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
          <p
            id="uidnote"
            className={
              userFocus && user && !validName ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            4 to 24 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores, hyphens allowed.
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

          <label htmlFor="password">
            Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validPwd || !pwd ? "hide" : "invalid"}
            />
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            // className={isCreating ? "show" : "hide"}
          />
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            8 to 24 characters.
            <br />
            Must include uppercase and lowercase letters, a number and a special
            character.
            <br />
            Allowed special characters:{" "}
            <span aria-label="exclamation mark">!</span>{" "}
            <span aria-label="at symbol">@</span>{" "}
            <span aria-label="hashtag">#</span>{" "}
            <span aria-label="dollar sign">$</span>{" "}
            <span aria-label="percent">%</span>
          </p>

          <label htmlFor="confirm_pwd">
            Confirm Password:
            <FontAwesomeIcon
              icon={faCheck}
              className={validMatch && matchPwd ? "valid" : "hide"}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={validMatch || !matchPwd ? "hide" : "invalid"}
            />
          </label>
          <input
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            // className={isCreating ? "show" : "hide"}
          />
          <p
            id="confirmnote"
            className={matchFocus && !validMatch ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Must match the first password input field.
          </p>

          <button
            // disabled={
            //   !fname ||
            //   fname.length < 6 ||
            //   !validName ||
            //   !validPwd ||
            //   !validMatch
            //     ? true
            //     : false
            // }
            className={
              (
                !fname ||
                fname.length < 6 ||
                !validEmail ||
                !validName ||
                !validPwd ||
                !validMatch
                  ? true
                  : false
              )
                ? "btn btn-success disabled"
                : "btn btn-success"
            }
          >
            {/* {isCreating ? "Sign Up" : "Update"} */}
            Sign Up
          </button>
        </form>
      </section>
    </div>
  );
}

export default Register;
