import React from "react";

export default function Conversation() {

  return (
    <>
      <div className="flex items-center p-3 cursor-pointer hover:bg-gray-200 mt-4">
        <img className="rounded-full h-16 w-16 flex items-center justify-center mr-4 object-cover" src="https://i1.sndcdn.com/avatars-000496987152-q3qzj0-t500x500.jpg" alt="" />
        <span className="text-base">Jonh Doe</span>
      </div>
    </>
  );
}