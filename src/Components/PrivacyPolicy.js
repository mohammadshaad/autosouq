import React from "react";
import Logo from "../images/enactus-logo-gray.png";

function PrivacyPolicy() {
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
          <div className="text-2xl md:text-4xl font-bold">Privacy Policy</div>
          <div className="text-base font-light text-gray-500">
            Last updated on Oct 26th 2023
          </div>
        </div>

        <div className="flex flex-col gap-10 items-center justify-center px-10">
          <div className="font-light text-sm md:text-base leading-relaxed text-justify">
            This privacy policy sets out how Enactus VIT Chennai uses and
            protects any information that you give Enactus VIT Chennai when you
            use this website. Enactus VIT Chennai is committed to ensuring that
            your privacy is protected. Should we ask you to provide certain
            information by which you can be identified when using this website,
            and then you can be assured that it will only be used in accordance
            with this privacy statement. Enactus VIT Chennai may change this
            policy from time to time by updating this page. You should check
            this page from time to time to ensure that you are happy with any
            changes.
          </div>

          <div className="w-full">
            <strong>We may collect the following information</strong>
            <div className="font-light text-sm md:text-base leading-relaxed text-justify mt-2 flex flex-col items-start justify-center gap-2">
              <div>Name and job title</div>

              <div>Contact information including email address</div>

              <div>
                Demographic information such as postcode, preferences and
                interests
              </div>

              <div>
                Other information relevant to customer surveys and/or offers
              </div>
            </div>
          </div>
          <div className="w-full">
            <strong>What we do with the information we gather</strong>
            <div className="font-light text-sm md:text-base leading-relaxed text-justify mt-2 flex flex-col items-start justify-center gap-2">
              <div>
                We require this information to understand your needs and provide
                you with a better service, and in particular for the following
                reasons:
              </div>

              <div>Internal record keeping.</div>

              <div>
                We may use the information to improve our products and services.
              </div>

              <div>
                We may periodically send promotional emails about new products,
                special offers or other information which we think you may find
                interesting using the email address which you have provided.
              </div>

              <div>
                From time to time, we may also use your information to contact
                you for market research purposes. We may contact you by email,
                phone, fax or mail. We may use the information to customise the
                website according to your interests.
              </div>

              <div>
                We are committed to ensuring that your information is secure. In
                order to prevent unauthorised access or disclosure we have put
                in suitable measures.
              </div>
            </div>
          </div>
          <div className="w-full">
            <strong>How we use cookies</strong>
            <div className="font-light text-sm md:text-base leading-relaxed text-justify mt-2 flex flex-col items-start justify-center gap-2">
              <div>
                A cookie is a small file which asks permission to be placed on
                your computer's hard drive. Once you agree, the file is added
                and the cookie helps analyses web traffic or lets you know when
                you visit a particular site. Cookies allow web applications to
                respond to you as an individual. The web application can tailor
                its operations to your needs, likes and dislikes by gathering
                and remembering information about your preferences.
              </div>

              <div>
                We use traffic log cookies to identify which pages are being
                used. This helps us analyses data about webpage traffic and
                improve our website in order to tailor it to customer needs. We
                only use this information for statistical analysis purposes and
                then the data is removed from the system.
              </div>

              <div>
                You can choose to accept or decline cookies. Most web browsers
                automatically accept cookies, but you can usually modify your
                browser setting to decline cookies if you prefer. This may
                prevent you from taking full advantage of the website.
              </div>
            </div>
          </div>
          <div className="w-full">
            <strong>Controlling your personal information</strong>
            <div className="font-light text-sm md:text-base leading-relaxed text-justify mt-2 flex flex-col items-start justify-center gap-2">
              <div>
                You may choose to restrict the collection or use of your
                personal information in the following ways:
              </div>

              <div>
                whenever you are asked to fill in a form on the website, look
                for the box that you can click to indicate that you do not want
                the information to be used by anybody for direct marketing
                purposes
              </div>

              <div>
                if you have previously agreed to us using your personal
                information for direct marketing purposes, you may change your
                mind at any time by writing to or emailing us at
                enactus.vitc@gmail.com
              </div>
              <div>
                We will not sell, distribute or lease your personal information
                to third parties unless we have your permission or are required
                by law to do so. We may use your personal information to send
                you promotional information about third parties which we think
                you may find interesting if you tell us that you wish this to
                happen.
              </div>
              <div>
                If you believe that any information we are holding on you is
                incorrect or incomplete, please write to or email us as soon as
                possible, at the above address. We will promptly correct any
                information found to be incorrect.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
