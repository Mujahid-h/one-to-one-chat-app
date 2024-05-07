import React from "react";
import Otheruser from "./Otheruser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = ({ searchQuery }) => {
  // My custom hook
  useGetOtherUsers();

  const otherUsers = useSelector((store) => store.user.otherUsers);
  if (!otherUsers) return; // Early return in react

  // Filter users based on searchQuery
  const filteredUsers = otherUsers.filter((user) =>
    user?.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="overflow-auto flex-1">
      {filteredUsers.map((user) => (
        <Otheruser key={user?._id} user={user} />
      ))}
    </div>
  );
};

export default OtherUsers;
