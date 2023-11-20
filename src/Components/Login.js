import React, { useState } from "react";
import { auth, firebase } from "../Config/Config";
import { Link } from "react-router-dom";
import LoginImg from "../images/login.png";
import GoogleImg from "../images/google.png";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        setError("");
        props.history.push("/");
      })
      .catch((err) => setError(err.message));
  };

  const googleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(() => {
        props.history.push("/");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-fields">
          <div className="login-titles">
            <h2 className="login-heading">Welcome Back</h2>
            <h5 className="login-sub-heading">Login back to your account</h5>
          </div>
          <form autoComplete="off" className="login-form" onSubmit={login}>
            <input
              type="email"
              className="email-input placeholder-black focus:text-black"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
            />
            <br />
            <input
              type="password"
              className="password-input placeholder-black focus:text-black"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
            />
            <br />
            <button type="submit" className="login-btn">
              LOGIN
            </button>
          </form>
          {/* <button onClick={googleSignIn} className="google-login-btn">
            <img src={GoogleImg} alt="" className="google-login-img" />
            Login with Google
          </button> */}
          {error && <span className="error-msg">{error}</span>}
          <br />
          <span className="register-here-title md:-mt-20">
            Don't have an account? 
            <Link to="signup" className="register-here">{" "} Register Here</Link>
          </span>
        </div>
        <div className="login-image">
          <img src={LoginImg} alt="" border="0" className="" />
        </div>
      </div>
    </div>
  );
};
