import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import { getUserById, getUsers } from "../controllers/userController.js";

const router = express.Router()

// User management routes
router.get('/', protect, adminOnly, getUsers)
router.get('/:id', protect, adminOnly, getUserById)

export default router