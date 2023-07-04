import { Router } from "express";
import {
  getUser,
  createUser,
  getUserById,
  getTotalUser,
  deleteUserById,
  updateUserById,
  getUserByEmail,
} from "../controllers/user.controller";

const router = Router();

router.get("/user", getUser);

router.post("/user", createUser);

router.get("/user/count", getTotalUser);

router.get("/user/:id", getUserById);

router.delete("/user/:id", deleteUserById);

router.get("/user_details/:email_id", getUserByEmail);

router.put("/user/:id", updateUserById);

export default router;
