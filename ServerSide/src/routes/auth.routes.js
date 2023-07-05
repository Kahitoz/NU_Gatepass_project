import { Router } from "express";
import { JWTgeneration } from "../controllers/auth.controller";

const router = Router();

router.post("/auth/google_JWT", JWTgeneration);
export default router;
