import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import React, { useContext, useEffect, useRef, useState } from "react";
import ChatOnline from "../components/ChatOnline/ChatOnline";
import Conversation from "../components/Conversations/Conversation";
import Message from "../components/Message/Message";
import { AuthContext } from "../contexts/AuthContext";
import Admin from "../layouts/Admin";
import { getAPIClient } from "../services/axios";
import { api } from "../services/api";
import io, { Socket } from 'socket.io-client';


export default function Messenger() {
  const { user, socket, onlineUsers } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  /* const socket: Socket = useRef(); */
  const scrollRef = useRef();

  useEffect(() => {
    if (user) {
      const getConversations = async () => {
        try {
          const res = await api.get(`/chat/${user._id}`);
          setConversations(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      getConversations();
    }
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await api.get(`/chat/messages/${currentChat._id}`);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    /* socket.current = io('http://localhost:3001/chat');
    console.log(socket.current); */
    if (socket) {
      socket.on("getMessage", data => {
        console.log("DATA", data);
        setArrivalMessage({
          sender: data.senderId,
          text: data.text,
          time: new Date().toISOString()
        });
      });
    }
  }, [socket, arrivalMessage]);

  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      chatId: currentChat._id,
      sender: user._id,
      text: newMessage
    };

    const receiverId = currentChat.members.find(member => member !== user._id);

    socket.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage
    });

    try {
      const res = await api.post(`/chat/messages`, message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Head>
        <title>Messenger</title>
      </Head>

      <div className="flex">
        <div className="h-full md:w-1/5 p-4">
          <div>
            <input type="search" placeholder="Search for friends" className="rounded w-full" />
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="h-full md:w-3/5 p-4">
          <div className="flex max-h-screen flex-col justify-between relative">
            {
              currentChat ?
                <>
                  <div className="h-modificada overflow-y-scroll pr-8">
                    {
                      messages.map(m => (
                        <div ref={scrollRef}>
                          <Message message={m} own={m.sender === user._id} />
                        </div>
                      ))
                    }
                  </div>
                  <div className="flex mt-2 content-center items-center justify-between">
                    <textarea
                      className="w-4/5 h-32 p-4"
                      placeholder="write something"
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button className="border-none bg-green-500 text-white cursor-pointer rounded-2xl w-24 h-12 hover:bg-green-700" onClick={handleSubmit}>Send</button>
                  </div>
                </>
                :
                <span className="absolute mt-32 text-6xl text-gray-300 text-center">Open a conversation to start a chat.</span>
            }
          </div>
        </div>
        <div className="h-full md:w-1/5 p-4">
          <div className="chatOnlineWrapper">
            <ChatOnline onlineUsers={onlineUsers} currentId={user?._id} setCurrentChat={setCurrentChat} />
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