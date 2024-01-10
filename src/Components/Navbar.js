import React, { useContext, useEffect, useState } from "react";
import logo from "../images/autosouq-logo.png";
import { Link } from "react-router-dom";
import { auth, db } from "../Config/Config";
import { Icon } from "react-icons-kit";
import { cart } from "react-icons-kit/entypo/cart";
import { user } from "react-icons-kit/icomoon/user";
import { useHistory } from "react-router-dom";
import { CartContext } from "../Global/CartContext";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { totalQty } = useContext(CartContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("SignedUpUsersData")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            const userData = snapshot.data();
            if (userData) {
              setCurrentUser(userData.Name);
              setProfileImageUrl(userData.ProfileImage);
              setRole(userData.Role);
              console.log(
                "Hey " +
                  userData.Name +
                  "! 👋 Welcome to AutoSouq ❤️ " +
                  "You are logged in now!" +
                  "Your email : " +
                  userData.Email +
                  "Your mobile : " +
                  userData.Mobile +
                  "Your address : " +
                  userData.Address
              );
            }
          });
      } else {
        setCurrentUser(null);
        setProfileImageUrl(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, [totalQty]);

  const handleLogout = () => {
    auth.signOut().then(() => {
      history.push("/");
    });
  };

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbox shadow-xl z-50">
      <div className={`mobile-nav ${isMenuOpen ? "menu-open" : ""}`}>
        <Link to="/" className="logo">
          <img src={logo} alt="AutoSouq Logo" />
        </Link>

        <div className="menu-buttons z-50" onClick={toggleMenu}>
          {!isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center w-full md:!p-4">
        <div
          className={`hidden md:flex items-center justify-center ${
            isMenuOpen ? "hidden" : ""
          }`}
        >
          <Link to="/" className="logo">
            <img src={logo} alt="AutoSouq Logo" />
          </Link>
        </div>

        {/* {currentUser && (
          <div className="relative rightside no-underline">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-full text-white hover:text-gray-300 focus:outline-none"
              onClick={toggleDropdown}
            >
              {profileImageUrl ? (
                <div className="p-2 rounded-3xl border border-gray-400 flex items-center justify-center gap-1">
                  <img
                    src={profileImageUrl}
                    alt="Profile"
                    className="h-12 w-12 rounded-full"
                  />
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className={`${
                        isDropdownOpen ? "-rotate-180" : "rotate-0"
                      } duration-200 transition-all w-4 h-4 text-gray-500`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="shadow-lg border border-lightOrange text-gray-600 hover:bg-lightOrange hover:border-lightOrange hover:text-white transition-all duration-200 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1}
                    stroke="currentColor"
                    className="w-6 h-6 md:w-8 md:h-8 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
              )}
            </button>

            {isDropdownOpen && (
              <div className="origin-top-right absolute top-20 md:top-14 md:right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <a
                    href="/profile"
                    className="block appearance-none hover:no-underline px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-lightOrange"
                    role="menuitem"
                  >
                    Profile
                  </a>
                  {role === "dealer" ? (
                    <Link
                      to="/dashboard"
                      className="block appearance-none hover:no-underline px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-lightOrange"
                      role="menuitem"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/wishlist"
                      className="block appearance-none hover:no-underline px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-lightOrange"
                      role="menuitem"
                    >
                      Wishlist
                    </Link>
                  )}
                  <a
                    href="#"
                    className="block appearance-none hover:no-underline px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  hover:text-lightOrange"
                    role="menuitem"
                    onClick={handleLogout}
                  >
                    Log out
                  </a>
                </div>
              </div>
            )}
          </div>
        )} */}

        {!currentUser && (
          <div className="flex items-center gap-4 md:gap-2 justify-end w-full">
            {(isMenuOpen || window.innerWidth > 768) && (
              <div className="flex items-start justify-center md:justify-end md:px-4 flex-col md:flex-row gap-6  w-full">
                <span className="">
                  <Link
                    to="login"
                    className="navlink sign-up !text-[10px] !px-4 !py-3 md:!text-sm"
                  >
                    LOGIN
                  </Link>
                </span>
                <span className="flex-shrink-0">
                  <Link
                    to="login"
                    className="navlink sign-up !text-[10px] !px-4 !py-3 md:!text-sm flex-shrink-0"
                  >
                    LOGIN AS DEALER
                  </Link>
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {isMenuOpen && currentUser && (
        <div className="relative rightside no-underline">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-full text-white hover:text-gray-300 focus:outline-none"
            onClick={toggleDropdown}
          >
            {profileImageUrl ? (
              <div className="p-2 rounded-3xl border border-gray-400 flex items-center justify-center gap-1">
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`${
                      isDropdownOpen ? "-rotate-180" : "rotate-0"
                    } duration-200 transition-all w-4 h-4 text-gray-500`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              <div className="shadow-lg border border-lightOrange text-gray-600 hover:bg-lightOrange hover:border-lightOrange hover:text-white transition-all duration-200 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-6 h-6 md:w-8 md:h-8 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </div>
            )}
          </button>

          {isDropdownOpen && (
            <div className="origin-top-right absolute top-20 md:top-14 md:right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <a
                  href="/profile"
                  className="block appearance-none hover:no-underline px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-lightOrange"
                  role="menuitem"
                >
                  Profile
                </a>
                {role === "dealer" ? (
                  <Link
                    to="/dashboard"
                    className="block appearance-none hover:no-underline px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-lightOrange"
                    role="menuitem"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/wishlist"
                    className="block appearance-none hover:no-underline px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-lightOrange"
                    role="menuitem"
                  >
                    Wishlist
                  </Link>
                )}
                <a
                  href="#"
                  className="block appearance-none hover:no-underline px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  hover:text-lightOrange"
                  role="menuitem"
                  onClick={handleLogout}
                >
                  Log out
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
