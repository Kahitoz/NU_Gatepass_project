import { Router } from "express";
import { insertLoggedOutJWT } from "../controllers/logout.controller";

const router = Router();

router.post("/logout", insertLoggedOutJWT);

export default router;
