import React, { useState } from "react";
import "./login-register.css";
import { NavLink, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert/Alert";
import AlertTitle from "@mui/material/AlertTitle/AlertTitle";
import { useLoginContext } from "../context/ContextProvider";
import axios from "axios";
import { baseURL } from "../../helper";

const SignIn = () => {
  const [signInInfo, setSignInInfo] = useState({
    email: "",
    password: "",
  });

  const { account, setAccount } = useLoginContext();

  function formUpdate(e: any) {
    const { name, value } = e.target;

    setSignInInfo(function () {
      return {
        ...signInInfo,
        [name]: value,
      };
    });
  }

  const [errorMessage, setErrorMessage] = useState<any>([]);
  const navigate = useNavigate();

  async function sendData(e: any) {
    e.preventDefault();
    const { email, password } = signInInfo;

    try {
      const res = await axios.post(
        `${baseURL}/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setAccount(res.data);
      localStorage.setItem("token", res.data.token);
      setSignInInfo(function () {
        return {
          ...signInInfo,
          email: "",
          password: "",
        };
      });
      //@ts-ignore
      document.querySelector(".error-alert").style.display = "none";
      //@ts-ignore
      document.querySelector(".success-alert").style.display = "flex";

      setTimeout(function () {
        navigate("/");
      }, 1000);
    } catch (error: any) {
      try {
        //@ts-ignore
        document.querySelector(".success-alert").style.display = "none";
        //@ts-ignore
        document.querySelector(".error-alert").style.display = "flex";
        const errors = error.response.data.message;
        const temp = [];

        for (let i = 0; i < errors.length; i++) {
          temp.push(errors[i].msg);
        }
        setErrorMessage(temp);
      } catch (err) {
        console.log(error);
      }
    }
  }

  return (
    <div className="signin">
      <NavLink to="/" className="logo">
        <img src="images/logo-dark.png" alt="logo" />
      </NavLink>

      <Alert
        variant="outlined"
        severity="warning"
        className="alert error-alert"
      >
        <AlertTitle className="alert-title">There were some errors</AlertTitle>
        <ul>
          {errorMessage.map(function (error: string, index: number) {
            return <li key={index}> {error} </li>;
          })}
        </ul>
      </Alert>

      <Alert variant="outlined" className="alert success-alert">
        Logged-in successfully!
      </Alert>

      <div className="form-details">
        <h3>Sign-In</h3>
        <form method="post" action="/" onSubmit={sendData}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            onChange={formUpdate}
            value={signInInfo.email}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={formUpdate}
            value={signInInfo.password}
            required
          />
          <button type="submit" id="submit" style={{}}>
            Login
          </button>
        </form>
      </div>

      <div className="new-to-stripe">
        <p>
          <span>New to Stripe?</span>
        </p>
        <NavLink to="/register">
          <button>Create Your Account</button>
        </NavLink>
      </div>
    </div>
  );
};

export default SignIn;
