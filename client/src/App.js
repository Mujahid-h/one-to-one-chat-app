import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/register",
    element: <Signup />,
  },

  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);

  useEffect(() => {
    if (authUser) {
      const socket = io("https://one-to-one-chat-app-blond.vercel.app", {
        query: {
          userId: authUser?._id,
        },
        withCredentials: true, // 👈 ADD THIS LINE
        transports: ["websocket"], // 👈 optional, ensures websocket is used directly
      });
      dispatch(setSocket(socket));

      // backend sa online users receive karrahay hain
      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);

  //   useEffect(() => {
  //   const initSocket = () => {
  //     const socket = io("https://one-to-one-chat-app-blond.vercel.app", {
  //       query: {
  //         userId: authUser?._id,
  //       },
  //       withCredentials: true,
  //     });
  //     dispatch(setSocket(socket));

  //     socket.on("getOnlineUsers", (onlineUsers) => {
  //       dispatch(setOnlineUsers(onlineUsers));
  //     });

  //     return () => {
  //       socket.close();
  //     };
  //   };

  //   if (authUser) {
  //     // fetch users first, then open socket
  //     initSocket();
  //   } else {
  //     if (socket) {
  //       socket.close();
  //       dispatch(setSocket(null));
  //     }
  //   }
  // }, [authUser]);

  return (
    <div className="p-4 h-screen flex justify-center items-center">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
