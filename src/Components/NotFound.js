import React from "react";
import NotFoundImg from "../images/pagenotfound.png";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export const NotFound = () => {
  return (
    <div className="container">
      <div className="error-wrapper">
        <img src={NotFoundImg} alt="Page Not Found" className="w-96" />
        <div>
          <h1>OOPS! Page Not Found</h1>
        </div>
        <Link to="/" className="pay-btn group !px-10 py-3 flex items-center justify-start w-full gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-black group-hover:text-gray-500"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
          Go Back
        </Link>
      </div>
    </div>
  );
};
