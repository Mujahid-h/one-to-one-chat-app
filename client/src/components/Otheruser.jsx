import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const Otheruser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);

  const isOnline = onlineUsers?.includes(user?._id);

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        className={`flex items-center gap-2 ${
          selectedUser?._id === user?._id ? "bg-zinc-200 text-zinc-900 " : ""
        } hover:bg-zinc-200 text-zinc-200 hover:text-zinc-900 rounded p-2 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? "online" : ""} `}>
          <div className="w-12 rounded-full">
            <img src={user?.profilePhoto} alt="user-profile" />
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <p>{user?.fullName}</p>
        </div>
      </div>
      <div className="divider my-0 py-0"></div>
    </>
  );
};

export default Otheruser;
