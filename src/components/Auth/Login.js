import React from "react";
import { useRef, useState, useEffect } from "react";
import { userAccountService } from "../../services/useraccountService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authenticationActions } from "../../store/authentication-slice";

function Login() {
  const userRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [appName, setAppName] = useState("TRMS");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    //    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user && pwd) {
        console.log(user);
        console.log(pwd);
        const username = { user };
        const password = { pwd };

        const UserAccount = {
          UserName: user,
          FullName: "",
          Email: "",
          Password: pwd,
          IsActive: true,
        };
        // userAccountService.login(user, pwd).then((user) => {
        userAccountService.login(UserAccount).then((user) => {
          dispatch(authenticationActions.login(user));
          //Data saved succesfully
          // dispatch(
          //   uiActions.showNotification({
          //     open: true,
          //     message: "Saved data successfully!",
          //     type: "success",
          //   })
          // );
          // dispatch(triptypeActions.createnew());
          console.log("TGTGTG333");
          console.log(user);
          navigate("/");
        });
      }
      //    const response = await axios.post(
      //      LOGIN_URL,
      //      JSON.stringify({ user, pwd }),
      //      {
      //        headers: { "Content-Type": "application/json" },
      //        withCredentials: true,
      //      }
      //    );
      //   console.log(JSON.stringify(response?.data));
      //   //console.log(JSON.stringify(response));
      //   const accessToken = response?.data?.accessToken;
      //   const roles = response?.data?.roles;
      //    setUser("");
      //    setPwd("");
      //    setSuccess(true);
    } catch (err) {
      //   if (!err?.response) {
      //     setErrMsg("No Server Response");
      //   } else if (err.response?.status === 400) {
      //     setErrMsg("Missing Username or Password");
      //   } else if (err.response?.status === 401) {
      //     setErrMsg("Unauthorized");
      //   } else {
      //     setErrMsg("Login Failed");
      //   }
    }
  };

  return (
    <div className="App-section">
      <section>
        <h4>Welcome to {appName}</h4>
        <h4>Sign In</h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <button
            className={
              (!user || !pwd ? true : false)
                ? "btn btn-success disabled"
                : "btn btn-success"
            }
          >
            Sign In
          </button>
        </form>
      </section>
    </div>
  );
}

export default Login;
