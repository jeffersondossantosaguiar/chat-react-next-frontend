import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';

import { recoverUserInformation, signInRequest } from "../services/auth";
import { api } from "../services/api";
import axios from "axios";
import { GetServerSideProps } from "next";
import { getAPIClient } from "../services/axios";

import io, { Socket } from 'socket.io-client';

type User = {
  _id: string;
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
  singOut: () => void;
  token: string;
  socket: Socket;
  onlineUsers: any;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState(null);
  const [socket, setSocket] = useState<Socket>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();
    setToken(token);

    if (token) {
      recoverUserInformation().then(user => {
        setUser(user);
      });
    }
  }, []);

  useEffect(() => {
    console.log(isAuthenticated);
    console.log(user);
    if (user)
      setSocket(io('http://localhost:3001/chat'));
  }, [user]);

  useEffect(() => {
    socket?.emit("addUser", user._id);
  }, [socket]);

  useEffect(() => {
    socket?.on("getUsers", users => {
      setOnlineUsers(users);
    });
  }, [socket]);

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

  function singOut() {
    socket.disconnect();
    destroyCookie(null, 'nextauth.token');
    Router.push('/');
  }

  /*   const getServerSideProps: GetServerSideProps = async (ctx) => {
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
       
        await apiClient.get('/users')
  
      return {
        props: {}
      };
    }; */

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, singOut, token, socket, onlineUsers }}>
      {children}
    </AuthContext.Provider>
  );
}