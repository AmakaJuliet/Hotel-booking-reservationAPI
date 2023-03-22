import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const queryHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      cheapestPrice: { $gte: min, $lte: max },
    }).limit(req.query.limit);

    res.status(200).json({
      success: true,
      message: `${hotels.length} Hotels found`,
      hotels,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();

    res.status(200).json({
      success: true,
      message: `${hotels.length} Hotels found`,
      hotels,
    });
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countHotelByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
      { type: "resort", count: resortCount },
      { type: "villa", count: villaCount },
      { type: "cabin", count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res
        .status(404)
        .json({ success: false, message: "No Hotel with this ID", data: [] });
    }
    const rooms = await Room.find({ hotel: req.params.id }).populate(
      "hotel",
      "name"
    );
    return res.status(200).json({
      success: true,
      message: `${rooms.length} room(s) found in ${hotel.name}`,
      rooms,
    });
  } catch (error) {
    next(error);
  }
};

export const bookHotelRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "This Room is unavailable for reservation",
      });
    }
    const available = isInArray(
      room.unavailableDates,
      new Date(req.body.dates)
    );

    if (available) {
      return res.status(400).json({
        success: false,
        message: `Room is unavailable for reservation for date: ${new Date(
          req.body.dates
        )}`,
      });
    }
    await Room.findByIdAndUpdate(req.params.id, {
      $push: {
        unavailableDates: req.body.dates,
      },
    });
    await Booking.create({
      user: req.user.id,
      room: req.params.id,
      dates: req.body.dates,
      price: room.price,
      roomNumber: room.roomNumber,
    });
    return res
      .status(201)
      .json({ success: true, message: "Room Has been Booked Successfuly" });
  } catch (error) {
    next(error);
  }
};

function isInArray(array, value) {
  return !!array.find((item) => {
    return item.getDate() == value.getDate();
  });
}
