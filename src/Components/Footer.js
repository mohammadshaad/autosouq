import React from "react";
import Logo from "../images/autosouq-logo.svg";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const fadeInAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <div className="mt-20">
      <footer className="bg-white ">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8" ref={ref}>
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeInAnimation}
          >
            <div className="md:flex md:justify-between">
              <div className="mb-6 md:mb-0">
                <a href="https://www.enactusvitc.com/" className="flex items-center">
                  <img src={Logo} className="h-32 mr-3 mb-10" alt="Enactus Logo" />
                </a>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
                <div>
                  <h2 className="mb-6 text-sm font-semibold  uppercase text-gray-900">
                    Follow us
                  </h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="mb-4">
                      <a
                        href="https://www.instagram.com/enactusvitc"
                        className="hover:underline text-gray-300 hover:text-lightOrange "
                        target="_blank"
                      >
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://in.linkedin.com/company/enactusvitc"
                        className="hover:underline text-gray-300 hover:text-lightOrange"
                        target="_blank"
                      >
                        LinkedIn
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="mb-6 text-sm font-semibold  uppercase text-gray-900">
                    Legal
                  </h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="mb-4">
                      <a
                        href="/privacy-policy"
                        className="hover:underline text-gray-300 hover:text-lightOrange"
                        target="__blank"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li className="mb-4">
                      <a
                        href="/terms-of-service"
                        className="hover:underline text-gray-300 hover:text-lightOrange"
                        target="__blank"
                      >
                        Terms &amp; Conditions
                      </a>
                    </li>
                    <li className="mb-4">
                      <a
                        href="/contact-us"
                        className="hover:underline text-gray-300 hover:text-lightOrange"
                        target="__blank"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © {
                  new Date().getFullYear()
                } {" "}
                <a
                  href="https://www.autosouq.com/"
                  className="hover:underline text-black hover:text-lightOrange"
                >
                  AutoSouq
                </a>
                . All Rights Reserved.
              </span>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
