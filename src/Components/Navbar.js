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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
        // No user is signed in.
        setCurrentUser(null);
        setProfileImageUrl(null);
        setRole(null);
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, [totalQty]);

  // handle logout
  const handleLogout = () => {
    auth.signOut().then(() => {
      history.push("/");
    });
  };

  const handleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbox shadow-xl z-50">
      {/* <div className="mobile-nav">
        <Link to="/" className="logo">
          <img src={logo} alt="AutoSouq Logo" />
        </Link>

        <div className="menu-buttons" onClick={handleMenu}>
          {!isOpen && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={`menu-icon `}
            >
              <rect x="2" y="5" width="20" height="2" />
              <rect x="2" y="11" width="18" height="2" />
              <rect x="2" y="17" width="16" height="2" />
            </svg>
          )}

          {isOpen && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className={`menu-icon `}
            >
              <path d="M19.59 6L12 13.59L4.41 6L3 7.41L10.59 15L3 22.59L4.41 24L12 16.41L19.59 24L21 22.59L13.41 15L21 7.41L19.59 6Z" />
            </svg>
          )}
        </div>
      </div> */}

      <div className="flex items-center justify-center w-full">
        <div className="desktop-nav-menu">
          <Link to="/" className="logo">
            <img src={logo} alt="AutoSouq Logo" />
          </Link>
        </div>

        {currentUser && (
          <div className="relative rightside no-underline  ">
            {/* <Link to="/profile" className="group flex items-center justify-center flex-row  flex-shrink-0 gap-2 no-underline underline-offset-4">
            <Link to="/profile" className="group-hover:opacity-60 duration-200 transition-all navlink current-user text-xs no-underline appearance-none text-black">
              {currentUser}
            </Link>
            <span className="">
              <Icon icon={user} className="group-hover:opacity-60 text-black duration-200 transition-all user" size={23} />
            </span>
          </Link> */}

            <div className=" flex items-center justify-end w-full">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-full text-white hover:text-gray-300 focus:outline-none "
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
                  <div className=" shadow-lg border border-lightOrange text-gray-600 hover:bg-lightOrange hover:border-lightOrange hover:text-white transition-all duration-200 rounded-full p-2">
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

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="origin-top-right absolute top-14 right-0 mt-2 w-48 z-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1 z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    {/* Dropdown items */}
                    <a
                      href="/profile"
                      className="block appearance-none hover:no-underline px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-lightOrange"
                      role="menuitem"
                    >
                      Profile
                    </a>
                    {/* <Link
                      to="/wishlist"
                      className="block appearance-none hover:no-underline px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-lightOrange"
                      role="menuitem"
                    >
                      Wishlist
                    </Link> */}
                    {role === "dealer" ? (
                      <Link
                        to="/dashboard"
                        className=" block appearance-none hover:no-underline px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-lightOrange"
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

            {/* <span>
            <Link to="cart" className="navlink">
              <Icon icon={cart} className="cart" />
              <span className="no-of-products">{totalQty}</span>
            </Link>
          </span> */}
            {/* <span className="flex items-center justify-center ml-3">
            <Link to="cart" className="navlink cart-icon absolute">
              <Icon icon={cart} className="cart" size={20}/>
              <span className="no-of-products relative bottom-2 px-1">
                {totalQty}
              </span>
            </Link>
          </span> */}
            {/* <span>
            <button className="login" onClick={handleLogout}>
              Logout
            </button>
          </span> */}
          </div>
        )}
        {!currentUser && isOpen && (
          <div className="p-4 flex items-center gap-4 md:gap-2 justify-end w-full">
            {/* <span className="flex items-center justify-center ">
            <Link to="cart" className="navlink cart-icon absolute">
              <Icon icon={cart} className="cart" />
              <span className="no-of-products relative bottom-2 px-1">
                {totalQty}
              </span>
            </Link>
          </span> */}
            {/* <span>
            <Link to="login" className="navlink login">
              LOGIN
            </Link>
          </span> */}
            <span className="">
              <Link
                to="login"
                className="navlink sign-up !text-[10px] !px-4 !py-3 md:!text-sm"
              >
                LOGIN
              </Link>
            </span>
            <span className="">
              <Link
                to="login"
                className="navlink sign-up !text-[10px] !px-4 !py-3 md:!text-sm"
              >
                LOGIN AS DEALER
              </Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
