
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Carousel from "../../components/Carousel";

import { testApi } from "../../apis/Api";
import Footer from "../../components/Footer";

import Products from "../../components/Products";

const Homepage = () => {
  // Print Hello!, when page load (Automatic)
  useEffect(() => {
    console.log("Hello!!!");

    // trigger testAPI
    testApi().then((res) => {
      console.log(res); // Test api is working!
    });
  });

  return (
    <div>

       <Carousel />
      <Products />
     
      {/* <Card /> */}

      <Footer />
      <cart />
    </div>
  );
};

export default Homepage;

