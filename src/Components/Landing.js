import React, { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { About } from "./About";
import { Products } from "./Products";
import { useHistory } from "react-router-dom";
import { auth } from "../Config/Config";
import Footer from "./Footer";

export const Landing = ({ user }) => {

  return (
    <div>
      <Navbar user={user} />
      <Hero />
      <About />
      <Products />
      <Footer />
    </div>
  );
};
