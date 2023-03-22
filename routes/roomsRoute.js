import express from "express";
const router = express.Router();

import {
  createRoom,
  updateRoomAvailability,
  getAvailableRooms,
} from "../controllers/roomController.js";

router.post("/:hotelId", createRoom);
router.get("/all", getAvailableRooms);

export default router;
