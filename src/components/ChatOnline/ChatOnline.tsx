import React, { useEffect, useState } from "react";
import { api } from "../../services/api";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await api.get(`/users/friends/${currentId}`);

      setFriends(res.data);
    };

    getFriends();
  }, []);

  useEffect(() => {
    console.log("Friends", friends);
    console.log("onlineUsers", onlineUsers);
    const teste = friends.filter((f) => onlineUsers.some((o) => {
      return f._id === o._id;
    }));
    console.log("TESTE", teste);
    setOnlineFriends(friends.filter((f) => onlineUsers.some((o) => {
      return f._id === o._id;
    })));
  }, [friends, onlineUsers]);

  return (
    <>
      <div className="chatOnline">
        {onlineFriends.map(o => (
          <div className="chatOnlineFriend flex items-center text-base cursor-pointer mt-4">
            <div className="chatOnlineImgContainer relative mr-2">
              <img className="chatOnlineImage h-10 w-10 rounded-full border-white" src={o.avatar_url} alt="" />
              <div className="chatOnlineBadge absolute w-3 h-3 rounded-full bg-green-500 top-0 right-0"></div>
            </div>
            <div className="chatOnlineName">{o.name}</div>
          </div>
        ))}
      </div>
    </>
  );
}