import { Router } from "express";
import {
    blacklistedStudentWise,blacklistedGroupWise,AutoApprovedAll,wardenGatepassDetails,getAllGatePassesToday,getHostelTowers,getAllWardens,getAllottedTowersReport
} from "../controllers/ChiefWarden.controller";

const router = Router();

router.get("/ChiefWarden/blacklistedStudentWise", blacklistedStudentWise);
router.get("/ChiefWarden/autoApprovedAll", AutoApprovedAll);
router.get("/ChiefWarden/blacklistedGroupWise", blacklistedGroupWise);
router.get("/ChiefWarden/WardenGatepassDetails", wardenGatepassDetails);
router.get("/ChiefWarden/getAllGatePassesToday", getAllGatePassesToday);
router.get("/ChiefWarden/getHostelTowers/:hostel", getHostelTowers);
router.get("/ChiefWarden/getAllWardens", getAllWardens);
router.get("/ChiefWarden/getAllottedTowersReport", getAllottedTowersReport);

export default router;
