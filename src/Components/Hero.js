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
      <div className="landing__header__container pl-5 md:p-20">
        <div className="landing__header">
          <h1 className="landing__header__main ">
            Find the best deals on used cars in UAE
          </h1>
          <div className="flex flex-col items-start justify-center gap-4 mt-10 md:mt-4">
            <div className="w-full">
              <input
                type="text"
                placeholder="Search products"
                onChange={(e) => setSearchTerm(e.target.value)}
                className=" md:pr-60 pl-4 text-xl placeholder:text-white placeholder:text-lg md:placeholder:text-xl py-2 md:py-4 border text-white border-gray-300 rounded-full w-full focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center text-xs md:text-sm justify-start gap-4 flex-wrap">
              <select
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-2 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-lightOrange bg-transparent"
              >
                <option value="">Make</option>
                <option value="Toyota">Toyota</option>
                <option value="Mitsubishi">Mitsubishi</option>
                <option value="Nissan">Nissan</option>
                <option value="Hyundai">Hyundai</option>
                <option value="Ford">Ford</option>
                <option value="Honda">Honda</option>
                <option value="Chevrolet">Chevrolet</option>
                <option value="Volkswagen">Volkswagen</option>
                <option value="Jeep">Jeep</option>
                <option value="Toyota">Toyota</option>
                <option value="Land Rover">Land Rover</option>
                <option value="Audi">Audi</option>
                <option value="Ferrari">Ferrari</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
              </select>
              <select
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-2 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-lightOrange bg-transparent"
              >
                <option value="">Type</option>
                <option value="SUV">SUV</option>
                <option value="Sedan">Sedan</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Truck">Truck</option>
                <option value="Coupe">Coupe</option>
                <option value="Convertible">Convertible</option>
                <option value="Luxury">Luxury</option>
              </select>
              <select
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-2 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-lightOrange bg-transparent"
              >
                <option value="">City</option>
                <option value="Abu Dhabi">Abu Dhabi</option>
                <option value="Sharjah">Sharjah</option>
                <option value="Dubai">Dubai</option>
                <option value="Ajman">Ajman</option>
                <option value="Al Ain">Al Ain</option>
                <option value="Riyadh">Riyadh</option>
                <option value="Jeddah">Jeddah</option>
                <option value="Doha">Doha</option>
                <option value="Muscat">Muscat</option>
                <option value="Kuwait City">Kuwait City</option>
                <option value="Manama">Manama</option>
              </select>
            </div>
          </div>

          <Link to="products" className="mt-8 md:mt-4">
            <motion.button className="shop-now group flex items-center justify-center gap-2 transition-all duration-200">
              SEARCH NOW
              <ArrowLongRightIcon className="h-6 w-6 text-white group-hover:text-white transition-all duration-200 group-hover:translate-x-4" />
            </motion.button>
          </Link>

          <div className="mt-4 font-light text-gray-400 text-xl max-w-xl">
            Tired of endlessly scoring multiple sites for the perfect car? We've
            got you covered. AutoSouq seamlessly consolidates listings from
            major sites in the GCC, ensuring that your dream car is just a few
            clicks away.
          </div>
        </div>
      </div>
    </motion.div>
  );
};
