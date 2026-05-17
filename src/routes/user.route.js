import express from "express"
const router = express.Router();
import { registerUser, loginUser } from "../controllers/user.controller.js";
import authenticate from "../middlewares/auth.middleware.js";


router.post('/register', registerUser);
router.post('/login', loginUser);
export default router;