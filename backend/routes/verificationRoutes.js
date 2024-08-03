import express from "express";
import {jwtAuthMiddle} from "../jwt.js";

const router = express.Router();
router.get("/",jwtAuthMiddle);

export default router;