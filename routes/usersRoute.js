// const router = router("express").Router();
import express from "express";
const router = express.Router();

import {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserBooking,
  extendUserBooking,
} from "../controllers/userController.js";

import {
  verifyUser,
  verifyAdmin,
  verifyToken,
} from "../middlewares/verifyToken.js";

//update
router.get("/booking", verifyToken, getUserBooking);
router.put("/booking/:id", verifyToken, extendUserBooking);
router.put("/:id", verifyAdmin, updateUser);
router.delete("/:id", verifyAdmin, deleteUser);
router.get("/:id", verifyUser, getUser);
router.get("/", getAllUsers);

export default router;
