import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React from "react";
import NavBar from "../components/Navbars/DefaultNavbar";
import { getAPIClient } from "../services/axios";

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