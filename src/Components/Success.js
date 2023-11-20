import React from "react";
import { Link, useParams } from "react-router-dom";

function SuccessPage() {
  const { paymentId } = useParams();
  console.log(paymentId);
  
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h2>
        <p className="text-gray-600 mb-6">Your reference number is: <span className="font-bold">{paymentId}</span></p>
        <p className="text-gray-600 mb-6">Thank you for your purchase. Your payment was successful.</p>
        <div className="flex items-center justify-center">
          <Link to="/" className="underline-offset-4 no-underline text-gray-700 font-bold transition-all duration-200 hover:text-black text-center">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
