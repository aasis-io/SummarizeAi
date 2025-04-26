import React, { useContext, useEffect } from "react"; // Import useContext

import Hero from "./Hero";
import Features from "./Features";
import Testimonials from "./Testimonials";
import SignFooter from "./SignFooter";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify"; // Import toast

const Home = () => {

  return (
    <div className="main-content">
      <Hero />
      <Features />
      <Testimonials />
      <SignFooter />
    </div>
  );
};
export default Home;
