//const router = require("express").Router();
import express from "express";
const router = express.Router();

import { register, login } from "../controllers/authController.js";
import { verifyUser, verifyAdmin } from "../middlewars/verifyToken.js";

router.post("/register", register);
router.post("/login", login);

// module.exports = router

export default router;
