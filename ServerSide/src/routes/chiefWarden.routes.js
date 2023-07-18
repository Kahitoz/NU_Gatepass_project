import { Router } from "express";
import {
    blacklistedStudentWise,blacklistedGroupWise,AutoApprovedAll,wardenGatepassDetails,getAllGatePassesToday
} from "../controllers/ChiefWarden.controller";

const router = Router();

router.get("/ChiefWarden/blacklistedStudentWise", blacklistedStudentWise);
router.get("/ChiefWarden/autoApprovedAll", AutoApprovedAll);
router.get("/ChiefWarden/blacklistedGroupWise", blacklistedGroupWise);
router.get("/ChiefWarden/WardenGatepassDetails", wardenGatepassDetails);
router.get("/ChiefWarden/getAllGatePassesToday", getAllGatePassesToday);


export default router;
