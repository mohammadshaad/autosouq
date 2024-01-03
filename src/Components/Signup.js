import React, { useState } from "react";
import { auth, db, firebase } from "../Config/Config";
import { Link } from "react-router-dom";
import LoginImg from "../images/login.png";
import GoogleImg from "../images/google.png";
import FacebookImg from "../images/facebook.png";

export const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [role, setRole] = useState("user");
  const [tnrNum, setTnrNum] = useState("");
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);
  };

  const signup = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        const storageRef = firebase
          .storage()
          .ref(`profile_images/${cred.user.uid}`);

        if (profileImage) {
          storageRef.put(profileImage).then((snapshot) => {
            snapshot.ref.getDownloadURL().then((downloadURL) => {
              const userData = {
                Name: name,
                Email: email,
                Password: password,
                Mobile: mobile,
                Address: address,
                ProfileImage: downloadURL,
                Role: role,
                TnrNum: tnrNum,
              };

              db.collection("SignedUpUsersData")
                .doc(cred.user.uid)
                .set(userData)
                .then(() => {
                  setName("");
                  setEmail("");
                  setPassword("");
                  setMobile("");
                  setAddress("");
                  setProfileImage(null);
                  setRole("user");
                  setTnrNum("");
                  setError("");
                  props.history.push("/login");
                })
                .catch((err) => setError(err.message));
            });
          });
        } else {
          const userData = {
            Name: name,
            Email: email,
            Password: password,
            Mobile: mobile,
            Address: address,
            Role: role,
            TnrNum: tnrNum,
          };

          db.collection("SignedUpUsersData")
            .doc(cred.user.uid)
            .set(userData)
            .then(() => {
              setName("");
              setEmail("");
              setPassword("");
              setMobile("");
              setAddress("");
              setRole("user");
              setTnrNum("");
              setError("");
              props.history.push("/login");
            })
            .catch((err) => setError(err.message));
        }
      })
      .catch((err) => setError(err.message));
  };

  const googleSignup = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        const userData = {
          Name: user.displayName,
          Email: user.email,
          Mobile: mobile,
          Address: address,
          Role: role,
          TnrNum: tnrNum,
        };

        db.collection("SignedUpUsersData")
          .doc(user.uid)
          .set(userData)
          .then(() => {
            props.history.push("/login");
          })
          .catch((err) => setError(err.message));
      })
      .catch((err) => setError(err.message));
  };

  const facebookSignup = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        const userData = {
          Name: user.displayName,
          Email: user.email,
          Mobile: mobile,
          Address: address,
          Role: role,
          TnrNum: tnrNum,
        };

        db.collection("SignedUpUsersData")
          .doc(user.uid)
          .set(userData)
          .then(() => {
            props.history.push("/login");
          })
          .catch((err) => setError(err.message));
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="signup-container">
      <div className="login-wrapper">
        <div className="login-fields">
          <div className="login-titles">
            <h2 className="login-heading">Sign up</h2>
            <h5 className="login-sub-heading">
              Create an account to get started!
            </h5>
          </div>
          <form
            autoComplete="off"
            className="login-form gap-6"
            onSubmit={signup}
          >
            <label htmlFor="profileImage" className="profileImage-label">
              Profile Image
            </label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <select
              className="role-select text-black placeholder-black focus:text-black w-full md:w-auto bg-gray-200 rounded-[10px]"
              onChange={(e) => setRole(e.target.value)}
              value={role}
              required
            >
              <option value="user">User</option>
              <option value="dealer">Dealer</option>
            </select>
            {role === "dealer" ? (
              <input
                type="text"
                className="email-input text-black placeholder-black focus:text-black"
                required
                onChange={(e) => setTnrNum(e.target.value)}
                value={tnrNum}
                placeholder="Enter your TNR number"
              />
            ) : null}
            {/* <input
              type="text"
              className="email-input text-black placeholder-black focus:text-black"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Enter your name"
            /> */}
            {role === "dealer" ? (
              <input
                type="text"
                className="email-input text-black placeholder-black focus:text-black"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter dealer name"
              />
            ) : (
              <input
                type="text"
                className="email-input text-black placeholder-black focus:text-black"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="Enter your name"
              />
            )}
            <input
              type="email"
              className="email-input text-black placeholder-black focus:text-black"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter your email"
            />
            <input
              type="password"
              className="password-input text-black placeholder-black focus:text-black"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter your password"
            />
            <input
              type="text"
              className="email-input text-black placeholder-black focus:text-black"
              required
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              placeholder="Enter your mobile number"
            />

            <br />
            <button type="submit" className="login-btn">
              SUBMIT
            </button>
            <div className="w-full flex items-center justify-center">
              <Link to="/" className="login">
                Go to Home
              </Link>
            </div>
          </form>
          <div className="flex md:flex-row flex-col gap-4 items-center justify-center w-full ">
            <button
              onClick={googleSignup}
              className="google-login-btn w-full md:w-auto"
            >
              <img src={GoogleImg} alt="" className="google-login-img" />
              Sign up with Google
            </button>
            <button
              onClick={facebookSignup}
              className="google-login-btn w-full md:w-auto"
            >
              <img src={FacebookImg} alt="" className="google-login-img" />
              Sign up with Facebook
            </button>
          </div>
          {error && <span className="error-msg">{error}</span>}
          <br />
          <span className="register-here-title md:-mt-6">
            Already have an account?
            <Link to="login" className="register-here">
              {" "}
              Login Here
            </Link>
          </span>
        </div>
        {/* <div className="login-image">
          <img src={LoginImg} alt="" border="0" className="" />
        </div> */}
      </div>
    </div>
  );
};
