import React from "react";
import Image from "../images/about-us.png";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2, // Adjust the threshold as needed
  });

  const fadeInAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1 },
    },
  };

  return (
    <div className="container">
      <div className="about-wrapper">
        <div className="about-image">
          <img src={Image} alt="Image" />
        </div>
        <div className="about-content" ref={ref}>
          <h1>About Us</h1>
          <motion.p
            variants={fadeInAnimation}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam a
            quibusdam, voluptatum, quod, quia voluptatem voluptas quos
            quibusdam, voluptatum, quod, quia voluptatem voluptas quos
            voluptatum voluptas quos voluptatum voluptas quos voluptatum
            voluptas quos voluptatum voluptas quos voluptatum voluptas quos
            voluptatum voluptas quos voluptatum voluptas quos voluptatum
            voluptas quos voluptatum voluptas quos voluptatum voluptas quos
            voluptatum voluptas quos voluptatum voluptas quos voluptatum
            voluptas quos voluptatum voluptas quos voluptatum voluptas quos
          </motion.p>
        </div>
      </div>
    </div>
  );
};
