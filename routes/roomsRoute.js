import express from "express";
const router = express.Router();

import { createHotel, updateRoomAvailability } from "../controllers/roomController.js";

router.post("/", createHotel);
router.put("/", updateRoomAvailability);

export default router;
