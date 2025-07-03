import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetMessages = () => {
  const selectedUser = useSelector((store) => store.user.selectedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `https://one-to-one-chat-app-blond.vercel.app/api/v1/message/${selectedUser?._id}`
        );
        dispatch(setMessages(res?.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [selectedUser]);
};

export default useGetMessages;
