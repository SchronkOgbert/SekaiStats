import React from "react";
import { Button } from "../Button";
import { useRef, useState, useEffect, useContext } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/authProvider";
import Navbar from "../Navbar/Navbar";
import Background from "../Background";
import {
  BrowserRouter as Route,
  Routes,
  Router,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";

const LOGIN_URL = "/Login/Response";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const readCookie = () => {
    const user = Cookies.get("user");
    if (user) {
      setSuccess(true);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleClick = async (e) => {
    try {
      Cookies.set("username", user);
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          //withCredentials: true
        }
      );
      const accessToken = response?.data?.accessToken;
      setAuth({ user, pwd, accessToken });
      console.log("before checking response");
      console.log(response);
      if (response.data === 1) {
        Cookies.set("user", "loginTrue");
        setSuccess(true);
        setUser("");
        setPwd("");
      } else {
        if (response.data === 0) {
          setErrMsg("Wrong Credentials!");
        }
        if (response.data === 2) {
          setErrMsg("Some Error 2");
        }
        if (response.data === 3) {
          setErrMsg("Some Error 3");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {success ? (
        <section>
          <Navigate to="/Homepage" />
        </section>
      ) : (
        <div>
          <Navbar />
          <Background />
          <div className="base-container">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <div className="header">Login</div>
            <div className="form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
              </div>
            </div>
            <div className="footer">
              <Button onClick={handleClick}>Login</Button>
            </div>
            Don't have an account?
            <a href="/Register">Register here!</a>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;

//     render() {
// return <div className="base-container" ref = {this.props.containerRef}>
//        <div className="header">Login</div>
//             <div className="form">
//                  <div className="form-group">
//                     <label htmlFor='username'>Username</label>
//                     <input type='text' name='username' placeholder='username'></input>
//                 </div>
//                     <div className="form-group">
//                         <label htmlFor='password'>Username</label>
//                         <input type='password' name='password' placeholder='password'></input>
//                     </div>
//                 </div>
//         <div className="footer">
//             <Button buttonSize>Login</Button>
//         </div>
//         Don't have an account?
//         <a href='/Register'>
//             Register here!
//         </a>
//     </div>
//     }
// }
