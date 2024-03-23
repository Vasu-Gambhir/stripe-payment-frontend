import React, { useEffect, useState } from "react";
import "./Navbar.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { ToastContainer, toast } from "react-toastify";
import { useLoginContext } from "../context/ContextProvider";
import { baseURL } from "../../helper";

const Navbar = () => {
  const [loginMsg, setLoginMsg] = useState("");
  const navigate = useNavigate();
  const { account, setAccount } = useLoginContext();

  const getDetailValidUser = async () => {
    try {
      const res = await axios.get(`${baseURL}/validuser`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.status !== 201) {
        navigate("/login");
        // toast.error('Please Login First')
      } else {
        setAccount(res?.data);
        const name = account?.userLogin?.name;
        let fname;
        if (name?.indexOf(" ") !== -1) {
          fname = name.substring(0, name.indexOf(" "));
        } else {
          fname = name;
        }
        setLoginMsg(fname);
      }
    } catch (error: any) {
      if (error?.response?.status) {
        navigate("/login");
        toast.error("Please Login First");
      }
    }
  };

  useEffect(() => {
    getDetailValidUser();
  }, [account?.userLogin?.name]);
  // Logout

  const logOutUser = async () => {
    const res2 = await axios.get(`${baseURL}/logout`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    if (res2.status !== 201) {
      console.log("error");
    } else {
      toast.success("User Logged Out", {
        position: "top-center",
      });
      setAccount({});
      navigate("/login");
    }
  };

  return (
    <header>
      <nav>
        <div className="navbar-left">
          <div className="logo">
            <NavLink to="/">
              <img src="images/logo-dark.png" alt="logo" />
            </NavLink>
          </div>

          <div className="navbar-tabs">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/allTransactions">Payment History</NavLink>
          </div>
        </div>

        <div className="navbar-right">
          <div className="display-name">Hello, {loginMsg}</div>

          <div className="logout" onClick={logOutUser}>
            <LogoutOutlinedIcon className="icon" /> <span>Sign Out</span>
          </div>
        </div>
      </nav>
      <ToastContainer />
    </header>
  );
};

export default Navbar;
