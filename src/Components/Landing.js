import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { About } from "./About";
import { Products } from "./Products";
import Footer from "./Footer";

export const Landing = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  return (
    <div>
      <Navbar user={user} />
      <Hero setSearchTerm={setSearchTerm} setSelectedFilter={setSelectedFilter} />
      <About />
      <Products searchTerm={searchTerm} selectedFilter={selectedFilter} />
      <Footer />
    </div>
  );
};
