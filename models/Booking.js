import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A Room must be booked by a user"],
    },
    room: {
      type: mongoose.Schema.ObjectId,
      ref: "Room",
      required: [true, "Booking must have a room"],
    },
    price: {
      type: Number,
      required: true,
    },
    paid: { type: Boolean, default: false },
    roomNumber: { type: Number, required: true },
    dates: { type: [Date] },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Booking", BookingSchema);
