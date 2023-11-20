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
            Enactus is an international non-profit organization that brings
            together student, academic, and business leaders who are committed
            to using the power of entrepreneurial action to improve the quality of
            life and standard of living for people in need. Guided by academic
            advisors and business experts, the student leaders of Enactus create
            and implement community empowerment projects around the globe. The
            experience not only transforms lives, it helps students develop the
            kind of talent and perspective that are essential to leadership in
            an ever-more complicated and challenging world.
          </motion.p>
        </div>
      </div>
    </div>
  );
};
