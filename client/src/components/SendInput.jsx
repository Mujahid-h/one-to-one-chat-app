import axios from "axios";
import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const SendInput = () => {
  const [message, setMessage] = useState("");
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://one-to-one-chat-app-blond.vercel.app/api/v1/message/send/${selectedUser?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(setMessages([...messages, res?.data?.newMessage]));
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={submitHandler} className="px-4 my-2 mt-auto">
      <div className="w-full relative flex items-center">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Send a message"
          className="input input-bordered bg-zinc-700 w-full text-zinc-200 text-sm"
        />
        <button type="submit" className="absolute insset-y-0 end-4">
          <IoMdSend size={24} className="text-zinc-500" />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
