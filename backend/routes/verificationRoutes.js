import express from "express";
import {jwtAuthMiddle} from "../jwt.js";
/*Through jwt authentication , it decides whether to give user the access to the home page*/
const router = express.Router();
router.get("/",jwtAuthMiddle);

export default router;