import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useSelector } from "react-redux";
// import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  // const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  // useEffect(() => {
  //   return () => dispatch(setSelectedUser(null));
  // }, []);

  return (
    <div className="md:min-w-[550px] flex flex-col ">
      {selectedUser ? (
        <>
          <div className="flex items-center gap-4 bg-zinc-700 text-white px-4 py-2 mb-2">
            <div className="avatar ">
              <div className="w-12 rounded-full">
                <img src={selectedUser.profilePhoto} alt="user-profile" />
              </div>
            </div>

            <div className="flex flex-col">
              <p>{selectedUser.fullName}</p>
              <p className="text-xs text-gray-400">
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
          <Messages />
          <SendInput />
        </>
      ) : (
        <div className="md:min-w-[550px] flex flex-col justify-center items-center h-full">
          <div className="w-20">
            <img src="/chat.png" alt="chat-logo" />
          </div>
          <p className="text-zinc-200 text-xl font-bold">
            Let's start the conversation
          </p>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
