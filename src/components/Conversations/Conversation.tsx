import React, { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

  if (!conversation.isGroup) {

    useEffect(() => {
      const friendId = conversation.members.find(member => member !== currentUser._id);

      const getUser = async () => {
        const res = await api.get(`/users/${friendId}`);
        setUser(res.data);
      };

      getUser();
    }, [currentUser, conversation]);

  }

  return (
    <>
      <div className="flex items-center p-3 cursor-pointer hover:bg-gray-200 mt-4">
        <img className="rounded-full h-16 w-16 flex items-center justify-center mr-4 object-cover" src={user ? user.avatar_url : "https://stylizedbay.com/wp-content/uploads/2018/02/unknown-avatar.jpg"} alt="" />
        <span className="text-base">{user ? user.name : conversation?.groupName}</span>
      </div>
    </>
  );
}