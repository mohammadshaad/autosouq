import React from "react";
import Logo from "../images/autosouq-logo.jpeg";

function RefundPolicy() {
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
          <div className="text-2xl md:text-4xl font-bold">Contact us</div>
          <div className="text-base font-light text-gray-500">
            Last updated on Oct 26th 2023
          </div>
        </div>

        <div className="flex flex-col gap-10 items-center justify-center px-10">
          <div className="font-light text-sm md:text-base leading-relaxed text-justify">
            <div className="font-light text-sm md:text-base leading-relaxed text-justify mt-2 flex flex-col items-start justify-center gap-2">
              <div>You may contact us using the information below:</div>

              <div>Merchant Legal entity name: AutoSouq</div>

              <div>
                Registered Address: Kelambakkam - Vandalur Rd, Rajan Nagar,
                Chennai, Tamil Nadu 600127 Chennai TAMIL NADU 600127
              </div>
              <div>E-Mail ID: enactus.vitc@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RefundPolicy;
