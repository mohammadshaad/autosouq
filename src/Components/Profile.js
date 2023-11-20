import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import logo from "../images/enactus-logo-gray.png";
import { auth, db } from "../Config/Config";
import { Link } from "react-router-dom";

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
  const [isSignedIn, setIsSignedIn] = useState(false);

  // State for controlling the edit mode
  const [isEditMode, setIsEditMode] = useState(false);

  // State for form inputs
  const [editedUserName, setEditedUserName] = useState("");
  const [editedUserMobile, setEditedUserMobile] = useState("");
  const [editedUserEmail, setEditedUserEmail] = useState("");
  const [editedUserAddress, setEditedUserAddress] = useState("");

  useEffect(() => {
    // Set up an observer on the Auth object
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
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
            }
          });
      } else {
        setCurrentUserName(null);
        setCurrentUserEmail(null);
        setCurrentUserMobile(null);
        setCurrentUserAddress(null);
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    db.collection("users")
      .doc("user1")
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUserData(doc.data());
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  // Function to handle edit mode toggle
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Update user details in the database
    db.collection("SignedUpUsersData")
      .doc(auth.currentUser.uid)
      .update({
        Name: editedUserName,
        Email: editedUserEmail,
        Mobile: editedUserMobile,
        Address: editedUserAddress,
      })
      .then(() => {
        // Update state with new details
        setCurrentUserName(editedUserName);
        setCurrentUserEmail(editedUserEmail);
        setCurrentUserMobile(editedUserMobile);
        setCurrentUserAddress(editedUserAddress);

        // Exit edit mode
        setIsEditMode(false);
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8">
        {isEditMode ? (
          // Edit Mode Form
          <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
            <label className="flex flex-col">
              <span className="text-gray-700">Name:</span>
              <input
                type="text"
                value={editedUserName}
                onChange={(e) => setEditedUserName(e.target.value)}
                className="px-3 py-2 border rounded focus:outline-none focus:shadow-outline focus:border-blue-500"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-700">Mobile:</span>
              <input
                type="text"
                value={editedUserMobile}
                onChange={(e) => setEditedUserMobile(e.target.value)}
                className="px-3 py-2 border rounded focus:outline-none focus:shadow-outline focus:border-blue-500"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-700">Email:</span>
              <input
                type="email"
                value={editedUserEmail}
                onChange={(e) => setEditedUserEmail(e.target.value)}
                className="px-3 py-2 border rounded focus:outline-none focus:shadow-outline focus:border-blue-500"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-700">Address:</span>
              <textarea
                value={editedUserAddress}
                onChange={(e) => setEditedUserAddress(e.target.value)}
                className="px-3 py-2 border rounded focus:outline-none focus:shadow-outline focus:border-blue-500"
              />
            </label>
            <button
              type="submit"
              className="px-4 py-2 pay-btn !w-full focus:outline-none focus:shadow-outline "
            >
              Save
            </button>
          </form>
        ) : (
          // Display Mode
          <>
            <h2 className="text-2xl font-bold text-gray-800">
              <span className="text-gray-600 mr-1">Name:</span>
              {currentUserName}
            </h2>
            <p className="text-gray-800 mt-4">
              <span className="text-gray-600 mr-1">Mobile:</span>
              {currentUserMobile}</p>
            <div className="mt-4">
              <p className="text-gray-800">
                <span className="text-gray-600 mr-1">Email:</span>
                {currentUserEmail}</p>
            </div>
            <div className="mt-4">
              <p className="text-gray-800">
                <span className="text-gray-600 mr-1">Address:</span>
                {currentUserAddress}</p>
            </div>
          </>
        )}

        {/* Button to toggle edit mode */}
        <button
          onClick={toggleEditMode}
          className="mt-4 bg-[#f5cb5c] px-4 py-2 pay-btn !w-full"
        >
          {isEditMode ? "Cancel" : "Edit Details"}
        </button>
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
