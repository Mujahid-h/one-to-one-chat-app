// import express from "express";
// import dotenv from "dotenv";
// import userRoute from "./routes/userRoute.js";
// import messageRoute from "./routes/messageRoute.js";
// import connnectDB from "./config/databse.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import { server, app } from "./socket/socket.js";

// dotenv.config();

// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());
// const corsOption = {
//   origin: "http://localhost:3000",
//   credentials: true,
// };
// app.use(cors(corsOption));

// const PORT = process.env.PORT || 8000;

// // Routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/message", messageRoute);

// server.listen(PORT, () => {
//   connnectDB();
//   console.log(`Server listening on port ${PORT}`);
// });

// server.js or index.js
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
  origin: "https://one-to-one-chat-app-ujgw.vercel.app/",
  credentials: true,
};
app.use(cors(corsOption));

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// Connect to DB and then start server
const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connnectDB(); // Wait for DB connection first
    server.listen(PORT, () => {
      console.log(`✅ Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();
