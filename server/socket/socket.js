import { Server } from "socket.io";
import http from "http";
import express, { query } from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://one-to-one-chat-app-ujgw.vercel.app"],
    // origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // Is object main hum saaray online users ki socket id store karwaaingay

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== undefined) {
    userSocketMap[userId] = socket.id; // userSocketMap object main {key: value} pairs main save hoga
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap)); // backend sa online users frontend pa bhej rahay hain

  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // yahan pe agar koi logout krta hai to userSocketMap ko update karwarahay
  });
});

export { io, server, app };
