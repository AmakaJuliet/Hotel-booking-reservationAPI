import express from "express";
const router = express.Router();

import {
  createHotel,
  getHotels,
  countByCity,
  countHotelByType,
  getHotelRooms,
} from "../controllers/hotelController.js";
import { verifyUser, verifyAdmin } from "../middlewars/verifyToken.js";

router.post("/", createHotel);
router.get("/", getHotels);
router.get("/", countByCity);
router.get("/", countHotelByType);
router.get("/", getHotelRooms);

export default router;
