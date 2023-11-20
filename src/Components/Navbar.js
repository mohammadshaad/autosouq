import React, { useContext, useEffect, useState } from "react";
import logo from "../images/enactus-logo-gray.png";
import { Link } from "react-router-dom";
import { auth, db } from "../Config/Config";
import { Icon } from "react-icons-kit";
import { cart } from "react-icons-kit/entypo/cart";
import { user } from "react-icons-kit/icomoon/user";
import { useHistory } from "react-router-dom";
import { CartContext } from "../Global/CartContext";

export const Navbar = () => {
  const history = useHistory();
  const { totalQty } = useContext(CartContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [isOpen, setIsOpen] = useState(true);

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
              console.log(
                "Hey " +
                  userData.Name +
                  "! 👋 Welcome to Enactus VITC E-Commerce Site ❤️ " +
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
      }
    });

    // Clean up the observer when the component unmounts
    return () => unsubscribe();
  }, []);

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
    <div className="navbox shadow-xl">
      <div className="mobile-nav">
        <Link to="/" className="logo">
          <img src={logo} alt="Enactus Logo" />
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
      </div>

      <div className="desktop-nav-menu">
        <Link to="/" className="logo">
          <img src={logo} alt="Enactus Logo" />
        </Link>
      </div>

      {currentUser && isOpen && (
        <div className="rightside no-underline ">
          <Link to="/profile" className="group flex items-center justify-center flex-row  flex-shrink-0 gap-2 no-underline underline-offset-4">
            <Link to="/profile" className="group-hover:opacity-60 duration-200 transition-all navlink current-user text-xs no-underline">
              {currentUser}
            </Link>
            <span className="">
              <Icon icon={user} className="group-hover:opacity-60 text-black duration-200 transition-all user" size={23} />
            </span>
          </Link>
          {/* <span>
            <Link to="cart" className="navlink">
              <Icon icon={cart} className="cart" />
              <span className="no-of-products">{totalQty}</span>
            </Link>
          </span> */}
          <span className="flex items-center justify-center ml-3">
            <Link to="cart" className="navlink cart-icon absolute">
              <Icon icon={cart} className="cart" size={20}/>
              <span className="no-of-products relative bottom-2 px-1">
                {totalQty}
              </span>
            </Link>
          </span>
          <span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </span>
        </div>
      )}
      {!currentUser && isOpen && (
        <div className="rightside">
          <span className="flex items-center justify-center ">
            <Link to="cart" className="navlink cart-icon absolute">
              <Icon icon={cart} className="cart" />
              <span className="no-of-products relative bottom-2 px-1">
                {totalQty}
              </span>
            </Link>
          </span>
          <span>
            <Link to="login" className="navlink login">
              LOGIN
            </Link>
          </span>
          <span>
            <Link to="signup" className="navlink sign-up">
              SIGN UP
            </Link>
          </span>
        </div>
      )}
    </div>
  );
};
