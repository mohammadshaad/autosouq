import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import logo from "../images/autosouq-logo.jpeg";
import { auth, db } from "../Config/Config";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Loading from "./Loading";

// Check if Firebase app is not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCWt5sgt3WvQ4GjEiOezyZrK13ODaSYPaQ",
    authDomain: "enactus-ecommerce-e840f.firebaseapp.com",
    databaseURL: "https://enactus-ecommerce-e840f-default-rtdb.firebaseio.com",
    projectId: "enactus-ecommerce-e840f",
    storageBucket: "enactus-ecommerce-e840f.appspot.com",
    messagingSenderId: "1050946403575",
    appId: "1:1050946403575:web:501c9e8be00165d5aca7f2",
    measurementId: "G-F9JF3VY4R2",
  });
}

function Profile() {
  const [currentUserName, setCurrentUserName] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [currentUserMobile, setCurrentUserMobile] = useState(null);
  const [currentUserAddress, setCurrentUserAddress] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [role, setRole] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUserName, setEditedUserName] = useState("");
  const [editedUserMobile, setEditedUserMobile] = useState("");
  const [editedUserEmail, setEditedUserEmail] = useState("");
  const [editedUserAddress, setEditedUserAddress] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [tnrNum, setTnrNum] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("SignedUpUsersData")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            const userData = snapshot.data();
            if (userData) {
              setIsSignedIn(true);
              setCurrentUserName(userData.Name);
              setCurrentUserEmail(userData.Email);
              setCurrentUserMobile(userData.Mobile);
              setCurrentUserAddress(userData.Address);
              setProfileImageUrl(userData.ProfileImage);
              setRole(userData.Role);
              setTnrNum(userData.TnrNum);
            }
          });
      } else {
        setCurrentUserName(null);
        setCurrentUserEmail(null);
        setCurrentUserMobile(null);
        setCurrentUserAddress(null);
        setProfileImageUrl(null);
        setRole(null);
        setTnrNum(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // If a new profile image is selected, upload it to Firebase Storage
    if (newProfileImage) {
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(
        `profile_images/${auth.currentUser.uid}`
      );
      imageRef.put(newProfileImage).then(() => {
        // Get the updated image URL
        imageRef.getDownloadURL().then((url) => {
          // Update user details in the database
          updateUserData({
            Name: editedUserName,
            Email: editedUserEmail,
            Mobile: editedUserMobile,
            ProfileImage: url,
            TnrNum: tnrNum,
          });
        });
      });
    } else {
      // Update user details in the database without changing the profile image
      updateUserData({
        Name: editedUserName,
        Email: editedUserEmail,
        Mobile: editedUserMobile,
        Address: editedUserAddress,
        ProfileImage: profileImageUrl,
        TnrNum: tnrNum,
      });
    }
  };

  const updateUserData = (data) => {
    db.collection("SignedUpUsersData")
      .doc(auth.currentUser.uid)
      .update(data)
      .then(() => {
        setCurrentUserName(data.Name);
        setCurrentUserEmail(data.Email);
        setCurrentUserMobile(data.Mobile);
        setCurrentUserAddress(data.Address);
        setProfileImageUrl(data.ProfileImage);
        setTnrNum(data.TnrNum);
        setIsEditMode(false);
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
      });
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        {isEditMode ? (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="flex items-center">
              {newProfileImage ? (
                <img
                  src={URL.createObjectURL(newProfileImage)}
                  alt="New Profile"
                  className="rounded-full h-16 w-16 mr-4"
                />
              ) : (
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-20 h-20"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
              )}
              <div>
                <label className="cursor-pointer text-lightOrange">
                  Change Profile Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewProfileImage(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <label className="flex flex-col" htmlFor="tnrNum">
              <span className="text-gray-700">TNR Number:</span>
              <input
                type="text"
                value={tnrNum}
                onChange={(e) => setTnrNum(e.target.value)}
                className="px-3 py-2 border rounded focus:outline-none focus:text-black focus:shadow-outline focus:border-lightOrange"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-700">Name:</span>
              <input
                type="text"
                value={editedUserName}
                onChange={(e) => setEditedUserName(e.target.value)}
                className="px-3 py-2 border rounded focus:outline-none focus:text-black focus:shadow-outline focus:border-lightOrange"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-700">Mobile:</span>
              <input
                type="text"
                value={editedUserMobile}
                onChange={(e) => setEditedUserMobile(e.target.value)}
                className="px-3 py-2 border rounded focus:outline-none focus:text-black focus:shadow-outline focus:border-lightOrange"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-700">Email:</span>
              <input
                type="email"
                value={editedUserEmail}
                onChange={(e) => setEditedUserEmail(e.target.value)}
                className="px-3 py-2 border rounded focus:outline-none focus:text-black focus:shadow-outline focus:border-lightOrange"
              />
            </label>
            {/* <label className="flex flex-col">
              <span className="text-gray-700">Address:</span>
              <textarea
                value={editedUserAddress}
                onChange={(e) => setEditedUserAddress(e.target.value)}
                className="px-3 py-2 border rounded focus:outline-none focus:text-black focus:shadow-outline focus:border-lightOrange"
              />
            </label> */}
            <button
              type="submit"
              className="px-4 py-2 login-btn !w-full focus:outline-none focus:shadow-outline "
            >
              Save
            </button>
          </form>
        ) : (
          // Display Mode
          <>
            <div className="flex items-center justify-center mb-10">
              {/* {profileImageUrl && (
                <div className="border-4 border-lightOrange rounded-full">
                  <img
                    src={profileImageUrl}
                    alt="Profile"
                    className="rounded-full h-32 w-32  "
                  />
                </div>
              )} */}

              {profileImageUrl ? (
                <div className="border-4 border-lightOrange rounded-full">
                  <img
                    src={profileImageUrl}
                    alt="Profile"
                    className="rounded-full h-32 w-32  "
                  />
                </div>
              ) : (
                <div className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-20 h-20"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center w-full flex-col">
              <h2 className="text-4xl font-bold text-gray-800 w-full text-center">
                {currentUserName}
              </h2>
              <p className="text-gray-800 flex items-center justify-center w-full text-center ">
                {role === "dealer" ? (
                  <span className="text-gray-600 mr-1">Dealer</span>
                ) : role === "user" ? (
                  <span className="text-gray-600 mr-1">User</span>
                ) : (
                  <span className="text-gray-600 mr-1">Loading</span>
                )}
              </p>
            </div>
            <div className="flex items-center justify-center w-full flex-col">
              <h2 className="text-lg font-bold text-gray-800 w-full text-center">
                {tnrNum}
              </h2>
            </div>
            <p className="text-gray-800 mt-4 flex items-center justify-start">
              <span className="text-gray-600 mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                  />
                </svg>
              </span>
              {currentUserMobile}
            </p>
            <div className="mt-4 flex items-center justify-start">
              <p className="text-gray-800 flex items-center justify-start">
                <span className="text-gray-600 mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                    />
                  </svg>
                </span>
                {currentUserEmail}
              </p>
            </div>
            {/* <div className="">
              <p className="text-gray-800 flex items-center justify-start">
                <span className="text-gray-600 mr-1 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </span>
                <div className="flex items-center justify-center">
                  {currentUserAddress ? (
                    currentUserAddress
                  ) : (
                    <p className="text-gray-500 italic mt-3">
                      Address not provided
                    </p>
                  )}
                </div>
              </p>
            </div> */}
          </>
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={toggleEditMode}
            className="px-4 py-2 login !w-1/2 mr-2"
          >
            {isEditMode ? "Cancel" : "Edit Details"}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 login !w-1/2 ml-2"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="return-to-home w-full flex items-center justify-center mt-10">
        <Link
          to="/"
          className="text-[#17191b]/50 hover:text-[#17191b] duration-200 transition-all no-underline decoration-white	 underline-offset-4 py-3"
        >
          Return to Home page
        </Link>
      </div>
    </div>
  );
}

export default Profile;
