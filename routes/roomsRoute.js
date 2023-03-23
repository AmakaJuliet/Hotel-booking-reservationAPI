import express from "express";
const router = express.Router();

import {
  createRoom,
  updateRoomAvailability,
  getAvailableRooms,
} from "../controllers/roomController.js";

router.post("/", createRoom);
router.put("/", updateRoomAvailability);

export default router;
