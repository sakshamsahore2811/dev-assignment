import React from "react";
import logo from "../images/devdynamics_ai_logo.jpg";

const Navbar: React.FC = () => {
    
  return (
    <>
      <div className="navbar justify-between items-center p-3 flex">
        <div className="navbar-left flex items-center gap-2 font-semibold text-2xl">
          <img src={logo} height={50} width={50} alt="logo" /> DevDynamics
        </div>
        <div className="navbar-right flex items-cetner gap-5">
          
          <div className="text-white bg-blue-700 rounded-md p-3"><a href="https://www.devdynamics.ai" rel="noopener" target="_blank">Book a demo</a></div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
