import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../Global/AuthContext";
import { auth, db } from "../Config/Config";
import { CartContext } from "../Global/CartContext";
import axios from "axios";
import { useHistory } from "react-router-dom";
import logo from "../images/autosouq-logo.jpeg";
import firebase from "firebase/app";
import "firebase/database";
import { Link } from "react-router-dom";

function PaymentForm() {
  const [currentUserName, setCurrentUserName] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [currentUserMobile, setCurrentUserMobile] = useState(null);
  const [currentUserAddress, setCurrentUserAddress] = useState(null);
  const { totalPrice, shoppingCart } = useContext(CartContext);
  const history = useHistory();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

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

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const redirectToLogin = () => {
    history.push("/login");
  };

  const handleCheckboxChange = () => {
    // Toggle the checkbox state
    setIsChecked(!isChecked);
  };

  const displayRazorpay = async () => {
    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // Check if the user is signed in
      if (!isSignedIn) {
        alert("Please sign in to make a payment.");
        redirectToLogin();
        return;
      }

      // Check if the checkbox is checked
      if (!isChecked) {
        alert("Please accept the terms and services.");
        return;
      }

      // Creating a new order
      const orderResult = await axios.post(
        "https://enactus-server.vercel.app/payment/orders",
        {
          totalPrice: totalPrice,
        }
      );

      if (!orderResult) {
        alert("Server error while creating an order. Are you online?");
        return;
      }

      // Getting the order details back
      const { amount, id: order_id, currency } = orderResult.data;

      // Log the order details
      // console.log("Order Details:", { amount, order_id, currency });

      const options = {
        key: "rzp_test_xpNrpSoMasXwsy",
        amount: amount.toString(),
        currency: currency,
        callback_url: 'https://enactus-server.vercel.app/payment/success',
        modal: {
          ondismiss: function () {
            // Handle dismissal of the modal if needed
            console.log("Razorpay modal closed");
          },
        },     
        name: "Enactus VIT Chennai",
        description: "Test Transaction",
        image: { logo },
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          // Log the data before making the POST request
          // console.log("Data to be sent:", data);

          const successResult = await axios.post(
            "https://enactus-server.vercel.app/payment/success",
            data
          );

          // Store information in Firebase
          if (successResult.data.msg === "success") {
            history.push("/success/" + successResult.data.paymentId);
            // history.push("/success");

            const orderData = {
              orderId: successResult.data.orderId,
              paymentId: successResult.data.paymentId,
              name: { currentUserName },
              mobile: { currentUserMobile },
              address: { currentUserAddress },
              email: { currentUserEmail },
              products: shoppingCart.map((product) => ({
                id: product.ProductID,
                name: product.ProductName || "",
                price: product.ProductPrice || 0,
                quantity: product.qty || 0,
              })),
              timestamp: firebase.database.ServerValue.TIMESTAMP,
            };

            // Store data in Firebase
            firebase.database().ref("orders").push(orderData);
            // console.log("Data to be sent:", orderData);
          }

          // Log the success result
          // console.log("Success Result:", successResult.data);

          alert(successResult.data.msg);
        },
        prefill: {
          name: { currentUserName },
          email: { currentUserEmail },
          contact: { currentUserMobile },
          address: { currentUserAddress },
        },
        notes: {
          address: { currentUserAddress },
        },
        theme: {
          color: "#154726",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error in displayRazorpay:", error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col gap-6 items-start justify-center p-10  md:p-20">
        <div className="instructions flex flex-col items-start justify-center md:p-20 max-w-2xl">
          <h1>Instructions</h1>
          <h5 className="mb-10">
            Please carefully read through the instructions below.
          </h5>
          <p className="mb-6">
            1. Before doing the payment go to
            <a
              href="https://www.enactusvitc.com/profile"
              target="_blank"
              rel="noreferrer"
              className="text-black underline-offset-4 underline hover:text-[#f5cb5c] duration-200 transition-all "
            >
              {" "}
              Profile
            </a>{" "}
            section and update your address and mobile number.
          </p>
          <p className="mb-6">2. Click on the "Pay Now" button to complete your payment.</p>
          <p className="mb-6">3. Accept the terms and services by checking the box below.</p>
        </div>
        <div className="w-full flex items-center justify-center ">
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <span className="ml-2">I have read and agree to the </span>
            <a
              href="https://www.enactusvitc.com/terms-of-service"
              target="_blank"
              rel="noreferrer"
              className="text-black underline-offset-4 underline hover:text-[#f5cb5c] duration-200 transition-all "
            >
              terms and services
            </a>
            .
          </label>
        </div>
        <div className="w-full flex items-center justify-center">
          <button className="pay-btn" onClick={displayRazorpay}>
            Pay Now
          </button>
        </div>

        <div className="return-to-home w-full flex items-center justify-center">
          <Link
            to="/"
            className="text-[#17191b]/50 hover:text-[#17191b] duration-200 transition-all no-underline decoration-white	 underline-offset-4 py-3"
          >
            Return to Home page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;
