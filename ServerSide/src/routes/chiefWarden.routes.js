import { Router } from "express";
import {
    blacklistedStudentWise,blacklistedGroupWise,AutoApprovedAll
} from "../controllers/ChiefWarden.controller";

const router = Router();

router.get("/ChiefWarden/blacklistedStudentWise", blacklistedStudentWise);
router.get("/ChiefWarden/autoApprovedAll", AutoApprovedAll);
router.get("/ChiefWarden/blacklistedGroupWise", blacklistedGroupWise);


export default router;
