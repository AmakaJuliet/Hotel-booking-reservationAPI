import express from "express";
const router = express.Router();

import {
  createRoom,
  updateRoomAvailability,
} from "../controllers/roomController.js";

import { verifyUser, verifyAdmin } from "../middlewars/verifyToken.js";

router.post("/", createRoom);
router.put("/", updateRoomAvailability);

export default router;
