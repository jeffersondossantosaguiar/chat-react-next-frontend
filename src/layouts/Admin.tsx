import React from "react";
import NavBar from "../components/Navbars/DefaultNavbar";

export default function Admin({ children }) {
  return (
    <>
      <div>
        <NavBar />
        <div>
          {children}
        </div>
      </div>
    </>
  );
}