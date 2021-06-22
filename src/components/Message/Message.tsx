import React from "react";

export default function Message({ own }) {

  return (
    <>
      <div className={`flex flex-col mt-4 ${own ? "items-end" : ""}`}>
        <div className="flex">
          <img className="rounded-full h-10 w-10 flex items-center justify-center mr-4 object-cover" src="https://i1.sndcdn.com/avatars-000496987152-q3qzj0-t500x500.jpg" alt="" />
          <p className={`p-4 rounded-3xl max-w-lg ${own ? "bg-gray-200 text-black" : "bg-blue-500 text-white"}`}>Lorem ipsum dolor sit amet, consectetur adip Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, eius non modi officiis beatae voluptate ratione, et voluptates accusantium magnam repellendus quasi autem perspiciatis rerum quidem veniam in esse eligendi!</p>
        </div>
        <div className="text-sm mt-3">
          1 hour ago
        </div>
      </div>
    </>
  );
}