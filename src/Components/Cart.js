import React, { useContext, useEffect } from "react";
import { CartContext } from "../Global/CartContext";
import { Navbar } from "./Navbar";
import { Icon } from "react-icons-kit";
import { iosTrashOutline } from "react-icons-kit/ionicons/iosTrashOutline";
import { Link } from "react-router-dom";
import NotFoundImg from "../images/pagenotfound.png";

export const Cart = ({ user }) => {
  const { shoppingCart, dispatch, totalPrice, totalQty } =
    useContext(CartContext);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const cartData = JSON.parse(savedCart);
      dispatch({ type: "SET_CART_FROM_LOCAL_STORAGE", cartData });
    }
  }, []);

  const handleDeleteFromCart = (productId) => {
    // Update local storage and dispatch action to update state
    dispatch({ type: "DELETE", id: productId });
    const updatedCart = shoppingCart.filter(
      (item) => item.ProductID !== productId
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      <Navbar user={user} />
      <>
        <div className="cart-container">
          {shoppingCart.length !== 0 && <h1>Your Wishlist</h1>}
          {shoppingCart.length === 0 && (
            <>
              <div className="cart-headline">
                <div>
                  <img
                    src={NotFoundImg}
                    alt="Page Not Found"
                    className="w-96"
                  />
                </div>
                <h5>No items in your wishlist</h5>
                <div className="return-to-home">
                  <Link
                    to="/"
                    className="text-[#17191b]/50 hover:text-[#17191b] duration-200 transition-all no-underline decoration-white	 underline-offset-4 py-3"
                  >
                    Return to Home page
                  </Link>
                </div>
              </div>
            </>
          )}
          {shoppingCart &&
            shoppingCart.map((cart) => (
              <div className="cart-card" key={cart.ProductID}>
                <div className="cart-img">
                  <img src={cart.ProductImg} alt="not found" />
                </div>

                <div className="cart-name">{cart.ProductName}</div>

                <div className="cart-price-orignal">
                  $ {cart.ProductPrice}.00
                </div>

                <button
                  className="delete-btn"
                  onClick={() => handleDeleteFromCart(cart.ProductID)}
                >
                  <Icon icon={iosTrashOutline} size={24} />
                </button>
              </div>
            ))}
          {/* {shoppingCart.length > 0 && (
            <div className="cart-summary w-full">
              <div className="cart-summary-heading">Cart-Summary</div>
              <div className="cart-summary-price">
                <span>Total Price</span>
                <span>{totalPrice}</span>
              </div>
              <div className="cart-summary-price">
                <span>Total Qty</span>
                <span>{totalQty}</span>
              </div>
              <div className="flex w-full md:w-1/2 flex-col md:flex-row items-center justify-center gap-6 ">
                <Link to="cashout" className="cashout-link w-full">
                  <button className="pay-btn w-full" style={{ marginTop: 5 + "px" }}>
                    Cash on Delivery
                  </button>
                </Link>
                <Link to="payment" className="cashout-link">
                  <button className="pay-btn w-full py-8 " >
                    Pay Now
                  </button>
                </Link>
              </div>
            </div>
          )} */}
        </div>
      </>
    </>
  );
};
