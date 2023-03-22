import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.ObjectId,
      ref: "Hotel",
      required: [true, "A Room must be belong to a Hotel"],
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumber: { type: Number, required: true },

    unavailableDates: { type: [Date] },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Room", RoomSchema);
