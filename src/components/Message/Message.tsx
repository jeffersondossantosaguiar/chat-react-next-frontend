import React, { useEffect, useState } from "react";
import * as timeago from 'timeago.js';
import { api } from "../../services/api";

export default function Message({ message, own }) {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const getUser = async () => {
      const res = await api.get(`/users/${message.sender}`);
      setUser(res.data);
    };

    getUser();
  }, [message]);

  return (
    <>
      <div className={`flex flex-col mt-4 ${own ? "items-end" : ""}`}>
        <div className="flex">
          <img className="rounded-full h-10 w-10 flex items-center justify-center mr-4 object-cover" src={user?.avatar_url} alt="" />
          <p className={`p-4 rounded-3xl max-w-lg ${own ? "bg-gray-200 text-black" : "bg-blue-500 text-white"}`}>{message.text}</p>
        </div>
        <div className="text-sm mt-3">
          {timeago.format(message.time)}
        </div>
      </div>
    </>
  );
}