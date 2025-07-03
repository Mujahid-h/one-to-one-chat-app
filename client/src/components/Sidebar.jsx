import React, { useState } from "react";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const logoutHandler = async () => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.get(
        `https://one-to-one-chat-h7ygns7tm-mujahid-hussains-projects.vercel.app/api/v1/user/logout`
      );
      toast.success(res?.data?.message);
      navigate("/login");
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-w-[300px] border-r border-zinc-400 p-4 flex flex-col">
      <form action="" className="flex items-center gap-1">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full bg-zinc-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      <div className="divider px-3"></div>
      <OtherUsers searchQuery={searchQuery} />
      <div className="mt-2">
        <button onClick={logoutHandler} className="btn btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
