import express from "express";
const router = express.Router();

import {
  createRoom,
  updateRoomAvailability,
} from "../controllers/roomController.js";

import { verifyUser, verifyAdmin } from "../middlewars/verifyToken.js";



export default router;
