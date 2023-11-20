import React from "react";
import Logo from "../images/enactus-logo-gray.png";

function TermsofService() {
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
            Terms & Conditions
          </div>
          <div className="text-base font-light text-gray-500">
            Last updated on Oct 26th 2023
          </div>
        </div>

        <div className="flex flex-col gap-10 items-center justify-center px-10">
          <div className="font-light text-sm md:text-base leading-relaxed text-justify">
            <div className="font-light text-sm md:text-base leading-relaxed text-justify mt-2 flex flex-col items-start justify-center gap-2">
              <div>
                The Website Owner, including subsidiaries and affiliates
                (“Website” or “Website Owner” or “we” or “us” or “our”) provides
                the information contained on the website or any of the pages
                comprising the website (“website”) to visitors (“visitors”)
                (cumulatively referred to as “you” or “your” hereinafter)
                subject to the terms and conditions set out in these website
                terms and conditions, the privacy policy and any other relevant
                terms and conditions, policies and notices which may be
                applicable to a specific section or module of the website.
              </div>

              <div>
                Welcome to our website. If you continue to browse and use this
                website you are agreeing to comply with and be bound by the
                following terms and conditions of use, which together with our
                privacy policy govern Enactus VIT Chennai''s relationship with
                you in relation to this website.
              </div>

              <div>
                The term 'Enactus VIT Chennai' or 'us' or 'we' refers to the
                owner of the website whose registered/operational office is
                Kelambakkam - Vandalur Rd, Rajan Nagar, Chennai, Tamil Nadu
                600127 Chennai TAMIL NADU 600127. The term 'you' refers to the
                user or viewer of our website.
              </div>
            </div>
          </div>

          <div className="w-full">
            <strong>
              The use of this website is subject to the following terms of use
            </strong>
            <div className="font-light text-sm md:text-base leading-relaxed text-justify mt-2 flex flex-col items-start justify-center gap-2">
              <div>
                The content of the pages of this website is for your general
                information and use only. It is subject to change without
                notice.
              </div>

              <div>
                Neither we nor any third parties provide any warranty or
                guarantee as to the accuracy, timeliness, performance,
                completeness or suitability of the information and materials
                found or offered on this website for any particular purpose. You
                acknowledge that such information and materials may contain
                inaccuracies or errors and we expressly exclude liability for
                any such inaccuracies or errors to the fullest extent permitted
                by law.
              </div>

              <div>
                Your use of any information or materials on this website is
                entirely at your own risk, for which we shall not be liable. It
                shall be your own responsibility to ensure that any products,
                services or information available through this website meet your
                specific requirements.
              </div>

              <div>
                This website contains material which is owned by or licensed to
                us. This material includes, but is not limited to, the design,
                layout, look, appearance and graphics. Reproduction is
                prohibited other than in accordance with the copyright notice,
                which forms part of these terms and conditions.
              </div>
              <div>
                Unauthorized use of this website may give rise to a claim for
                damages and/or be a criminal offense.
              </div>
              <div>
                From time to time this website may also include links to other
                websites. These links are provided for your convenience to
                provide further information.
              </div>
              <div>
                You may not create a link to this website from another website
                or document without Enactus VIT Chennai’s prior written consent.
              </div>
              <div>
                Your use of this website and any dispute arising out of such use
                of the website is subject to the laws of India or other
                regulatory authority.
              </div>
              <div>
                We as a merchant shall be under no liability whatsoever in
                respect of any loss or damage arising directly or indirectly out
                of the decline of authorization for any Transaction, on Account
                of the Cardholder having exceeded the preset limit mutually
                agreed by us with our acquiring bank from time to time
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsofService;
