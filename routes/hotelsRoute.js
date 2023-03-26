import express from "express";
const router = express.Router();
import { verifyToken, verifyAdmin } from "../middlewares/verifyToken.js";
import {
  createHotel,
  queryHotels,
  getAllHotels,
  countByCity,
  countHotelByType,
  getHotelRooms,
  bookHotelRoom,
} from "../controllers/hotelController.js";


router.post("/create", verifyAdmin, createHotel);
router.get("/all", getAllHotels);
router.get("/query", verifyToken, queryHotels);
router.get("/cities", countByCity);
router.get("/type", countHotelByType);
router.get("/:id/rooms", verifyToken, getHotelRooms);
router.put("/:id/rooms/:number/book", verifyToken, bookHotelRoom);

export default router;
