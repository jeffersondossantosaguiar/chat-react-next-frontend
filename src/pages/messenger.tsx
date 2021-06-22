import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import React from "react";
import ChatOnline from "../components/ChatOnline/ChatOnline";
import Conversation from "../components/Conversations/Conversation";
import Message from "../components/Message/Message";
import Admin from "../layouts/Admin";
import { getAPIClient } from "../services/axios";

export default function Messenger() {
  return (
    <div>
      <Head>
        <title>Messenger</title>
      </Head>

      <div className="flex">
        <div className="h-full md:w-1/5 p-4">
          <div>
            <input type="search" placeholder="Search for friends" className="rounded w-full" />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </div>
        <div className="h-full md:w-3/5 p-4">
          <div className="flex max-h-screen flex-col justify-between">
            <div className="h-modificada overflow-y-scroll pr-8">
              <Message own={false} />
              <Message own={false} />
              <Message own />
              <Message own={false} />
              <Message own={false} />
              <Message own />
              <Message own={false} />
              <Message own={false} />
              <Message own />
            </div>
            <div className="flex mt-2 content-center items-center justify-between">
              <textarea className="w-4/5 h-32 p-4" placeholder="write something"></textarea>
              <button className="border-none bg-green-500 text-white cursor-pointer rounded-2xl w-24 h-12 hover:bg-green-700">Send</button>
            </div>
          </div>
        </div>
        <div className="h-full md:w-1/5 p-4">
          <div className="chatOnlineWrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </div>
  );
}

Messenger.layout = Admin;

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