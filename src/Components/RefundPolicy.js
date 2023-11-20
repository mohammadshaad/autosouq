import React from "react";
import Logo from "../images/enactus-logo-gray.png";

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
          <div className="text-2xl md:text-4xl font-bold">
            Cancellation & Refund Policy
          </div>
          <div className="text-base font-light text-gray-500">
            Last updated on Oct 26th 2023
          </div>
        </div>

        <div className="flex flex-col gap-10 items-center justify-center px-10">
          <div className="font-light text-sm md:text-base leading-relaxed text-justify">
            <div className="font-light text-sm md:text-base leading-relaxed text-justify mt-2 flex flex-col items-start justify-center gap-2">
              <div>
                Enactus VIT Chennai believes in helping its customers as far as
                possible, and has therefore a liberal cancellation policy. Under
                this policy:
              </div>

              <div>
                Cancellations will be considered only if the request is made
                immediately after placing the order. However, the cancellation
                request may not be entertained if the orders have been
                communicated to the vendors/merchants and they have initiated
                the process of shipping them.
              </div>

              <div>
                Enactus VIT Chennai does not accept cancellation requests for
                perishable items like flowers, eatables etc. However,
                refund/replacement can be made if the customer establishes that
                the quality of product delivered is not good.
              </div>
              <div>
                In case of receipt of damaged or defective items please report
                the same to our Customer Service team. The request will,
                however, be entertained once the merchant has checked and
                determined the same at his own end. This should be reported
                within 2 days of receipt of the products.
              </div>
              <div>
                In case you feel that the product received is not as shown on
                the site or as per your expectations, you must bring it to the
                notice of our customer service within 2 days of receiving the
                product. The Customer Service Team after looking into your
                complaint will take an appropriate decision.
              </div>
              <div>
                In case of complaints regarding products that come with a
                warranty from manufacturers, please refer the issue to them.
              </div>
              <div>
                In case of any Refunds approved by the Enactus VIT Chennai,
                it’ll take 1-2 days for the refund to be processed to the end
                customer.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RefundPolicy;
