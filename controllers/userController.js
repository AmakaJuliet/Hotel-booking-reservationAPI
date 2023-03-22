import User from "../models/User.js";
import Booking from "../models/Booking.js";

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndDelete(req.params.id);

    res.status(200).json("User Has Been Deleted Successfully");
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserBooking = async (req, res, next) => {
  try {
    const booking = await Booking.find({ user: req.user.id });

    return res.status(200).json({
      success: true,
      message: `${booking.length} booking(s) found`,
      booking,
    });
  } catch (error) {
    next(error);
  }
};

export const extendUserBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    const date = new Date(booking.dates[0]);
    booking.dates.push(date.setDate(date.getDate()) + 1);
    //   {
    //     $push: {
    //       dates: date.setDate(date.getDate() + 1),
    //     },
    //   }
    // );

    return res.status(200).json({
      success: true,
      message: `${booking.length} booking(s) found`,
      booking,
    });
  } catch (error) {
    next(error);
  }
};
