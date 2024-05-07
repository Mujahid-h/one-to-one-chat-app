import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll?.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // Format Date
  const formatDate = (date) => {
    try {
      if (!date) return ""; // Handle null or undefined date values
      const options = {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        new Date(date)
      );
      return formattedDate.replace(",", "");
    } catch (error) {
      console.error("Error formatting date:", error);
      return ""; // Return empty string or some default value in case of error
    }
  };

  return (
    <div
      ref={scroll}
      className={`chat ${
        authUser?._id === message?.senderId ? "chat-end" : "chat-start"
      } `}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={`${
              message?.senderId === authUser?._id
                ? authUser?.profilePhoto
                : selectedUser?.profilePhoto
            }`}
          />
        </div>
      </div>
      <div
        className={`chat-bubble ${
          message?.senderId === authUser?._id
            ? "chat-bubble-success"
            : "chat-bubble-info"
        }`}
      >
        {message?.message}
      </div>
      <div className="chat-footer">
        <time className="text-xs opacity-80 text-white">
          {formatDate(message?.createdAt)}
        </time>
      </div>
    </div>
  );
};

export default Message;
