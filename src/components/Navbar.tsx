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
          <div className="text-xl flex gap-1 items-center">
            Login{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
          <div className="text-white bg-blue-700 rounded-md p-3">Book a demo</div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
