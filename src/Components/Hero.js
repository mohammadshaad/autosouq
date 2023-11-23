import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export const Hero = ({ setSearchTerm, setSelectedFilter }) => {
  const containerVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", duration: 1.5 },
    },
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
          <div className="flex flex-col items-start justify-center gap-4">
            <div className="w-full">
              <input
                type="text"
                placeholder="Search products"
                onChange={(e) => setSearchTerm(e.target.value)}
                className=" md:pr-40 pl-4 placeholder:text-white py-3 border text-white border-gray-300 rounded-full w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center text-xs md:text-sm justify-start gap-4 flex-wrap">
              <select
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-2 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-lightOrange bg-transparent"
              >
                <option value="">Make</option>
                <option value="Toyota">Toyota</option>
                <option value="Ferrari">Ferrari</option>
              </select>
              <select
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-2 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-lightOrange bg-transparent"
              >
                <option value="">Type</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
              </select>
              <select
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-2 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-lightOrange bg-transparent"
              >
                <option value="">Kilometers</option>
                <option value="0-10,000">0-10,000</option>
                <option value="10,000-20,000">10,000-20,000</option>
                <option value="20,000-30,000">20,000-30,000</option>
                <option value="30,000-40,000">30,000-40,000</option>
                <option value="40,000-50,000">40,000-50,000</option>
              </select>
              <select
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-2 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-lightOrange bg-transparent"
              >
                <option value="">City</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
              </select>
            </div>
          </div>

          <Link to="products" className='mt-8 md:mt-4'>
            <motion.button className="shop-now group flex items-center justify-center gap-2 transition-all duration-200">
              GO TO PRODUCTS
              <ArrowLongRightIcon className="h-6 w-6 text-white group-hover:text-white transition-all duration-200 group-hover:translate-x-4" />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
