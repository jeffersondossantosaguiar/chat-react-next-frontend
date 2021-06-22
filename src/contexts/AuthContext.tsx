import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';

import { recoverUserInformation, signInRequest } from "../services/auth";
import { api } from "../services/api";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getAPIClient } from "../services/axios";

type User = {
  name: string;
  email: string;
  avatar_url: string;
};

type SignInData = {
  email: string;
  password: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();

    if (token) {
      recoverUserInformation().then(user => {
        setUser(user);
      });
    }
  }, []);

  async function signIn({ email, password }: SignInData) {

    const { token, user } = await signInRequest({
      email,
      password,
    });

    setCookie(undefined, 'nextauth.token', token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    setUser(user);

    Router.push('/dashboard');
  }

  const getServerSideProps: GetServerSideProps = async (ctx) => {
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

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}