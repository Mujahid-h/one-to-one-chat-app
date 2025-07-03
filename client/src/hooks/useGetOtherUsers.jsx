import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        // axios.defaults.withCredentials = true;
        const res = await axios.get(
          `https://one-to-one-chat-app-blond.vercel.app/api/v1/user`,
          {
            withCredentials: true,
          }
        );
        dispatch(setOtherUsers(res?.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;
