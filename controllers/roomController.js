import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  const hotel = await Hotel.findById(hotelId);
  if (!hotel)
    return res.status(400).json({ success: false, message: "Invalid Hotel" });

  const newRoom = new Room(req.body);
  newRoom.hotel = hotelId;
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
  return res.status(201).json({
    success: true,
    message: "Room Created Successfully",
  });
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumber.$.unavailableDates": req.body.dates,
        },
      }
    );

    res.status(200).json("Room Status has been Updated");
  } catch (error) {
    next(error);
  }
};

export const getAvailableRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find().populate("hotel", "name type city");
    if (rooms.length < 1) {
      return res.status(400).json({
        success: false,
        message: `${rooms.length} Available rooms found`,
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: `${rooms.length} Available rooms found`,
      rooms,
    });
  } catch (error) {
    next(error);
  }
};
