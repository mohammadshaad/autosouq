import React from "react";
import { Link } from "react-router-dom";
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';
import { motion } from "framer-motion";

export const Hero = () => {
  const containerVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", duration: 1.5 } }
  };

  return (
    <motion.div
      className="landing__container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="landing__header__container">
        <div className="landing__header">
          <h1 className="landing__header__main">
            Lorem Ipsum is simply dummy text of the printing and typesetting
          </h1>
          <Link to="products">
            <motion.button
              className="shop-now group flex items-center justify-center gap-2 transition-all duration-200"
            >
              SEE MORE
              <ArrowLongRightIcon className="h-6 w-6 text-white group-hover:text-white transition-all duration-200 group-hover:translate-x-4" />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
