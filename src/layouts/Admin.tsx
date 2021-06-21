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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['nextauth.token']: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    };
  }
  /* 
    await apiClient.get('/users') */

  return {
    props: {}
  };
};