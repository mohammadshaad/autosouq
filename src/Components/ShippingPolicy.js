import React from "react";
import Logo from "../images/autosouq-logo.jpeg";

function ShippingPolicy() {
  return (
    <div className="container w-full flex items-center justify-center">
      <div className="wrapper pb-20 md:py-10 w-full flex flex-col items-center justify-center md:px-40">
        <div className="flex items-center justify-center w-full gap-5 py-10">
          <div className="w-60 md:w-80">
            <img src={Logo} alt="logo" className="w-full" />
          </div>
        </div>
        <hr className="w-1/2" />

        <div className="flex flex-col gap-4 items-center justify-center w-full py-10">
          <div className="text-2xl md:text-4xl font-bold">
          Shipping & Delivery Policy

</div>
          <div className="text-base font-light text-gray-500">
            Last updated on Oct 26th 2023
          </div>
        </div>

        <div className="flex flex-col gap-10 items-center justify-center px-10">
          <div className="font-light text-sm md:text-base leading-relaxed text-justify">
            <div className="font-light text-sm md:text-base leading-relaxed text-justify mt-2 flex flex-col items-start justify-center gap-2">
              <div>
              For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only. For domestic buyers, orders are shipped through registered domestic courier companies and /or speed post only. Orders are shipped within 3-5 days or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms. Enactus VIT Chennai is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 3-5 days from the date of the order and payment or as per the delivery date agreed at the time of order confirmation. Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration. For any issues in utilizing our services you may contact our helpdesk on or enactus.vitc@gmail.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingPolicy;
