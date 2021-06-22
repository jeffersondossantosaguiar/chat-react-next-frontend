import React from "react";

export default function ChatOnline() {

  return (
    <>
      <div className="chatOnline">
        <div className="chatOnlineFriend flex items-center text-base cursor-pointer mt-4">
          <div className="chatOnlineImgContainer relative mr-2">
            <img className="chatOnlineImage h-10 w-10 rounded-full border-white" src="https://i1.sndcdn.com/avatars-000496987152-q3qzj0-t500x500.jpg" alt="" />
            <div className="chatOnlineBadge absolute w-3 h-3 rounded-full bg-green-500 top-0 right-0"></div>
          </div>
          <div className="chatOnlineName">John Doe</div>
        </div>
      </div>
    </>
  );
}