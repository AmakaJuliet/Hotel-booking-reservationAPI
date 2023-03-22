//const express = require("express");
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/usersRoute.js";
import hotelRoutes from "./routes/hotelsRoute.js";
import roomRoutes from "./routes/roomsRoute.js";

const app = express();
dotenv.config();

//Database Connection
const db_connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw error;
  }
};

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/hotel", hotelRoutes);
app.use("/api/room", roomRoutes);
app.use("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome to Hotel Booking API 🎯🎯🎯",
  });
});

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  db_connect();
  console.log(`Server is running on port 8800`);
});
