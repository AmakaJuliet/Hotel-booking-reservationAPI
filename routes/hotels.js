import express from "express";
const router = express.Router()

import { createHotel, getHotels, countByCity, countHotelByType, getHotelRooms} from "../controllers/hotel.js";

router.post("/", createHotel)
router.get("/", getHotels);
router.get("/", countByCity);
router.get("/", countHotelByType);
router.get("/", getHotelRooms);

export default router