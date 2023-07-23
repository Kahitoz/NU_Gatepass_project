import { Router } from "express";
import {
    blacklistedStudentWise,blacklistedGroupWise,AutoApprovedAll,wardenGatepassDetails,getAllGatePassesToday,getHostelTowers
} from "../controllers/ChiefWarden.controller";

const router = Router();

router.get("/ChiefWarden/blacklistedStudentWise", blacklistedStudentWise);
router.get("/ChiefWarden/autoApprovedAll", AutoApprovedAll);
router.get("/ChiefWarden/blacklistedGroupWise", blacklistedGroupWise);
router.get("/ChiefWarden/WardenGatepassDetails", wardenGatepassDetails);
router.get("/ChiefWarden/getAllGatePassesToday", getAllGatePassesToday);
router.get("/ChiefWarden/getHostelTowers/:hostel", getHostelTowers);


export default router;
