import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import connnectDB from "./config/databse.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { server, app } from "./socket/socket.js";

dotenv.config();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOption = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOption));

const PORT = process.env.PORT || 8000;

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

server.listen(PORT, () => {
  connnectDB();
  console.log(`Server listening on port ${PORT}`);
});
