import { Router } from "express";
import {
    blacklistedStudentWise,blacklistedGroupWise,AutoApprovedAll,wardenGatepassDetails,getAllGatePassesToday,getHostelTowers,getAllWardens
} from "../controllers/ChiefWarden.controller";

const router = Router();

router.get("/ChiefWarden/blacklistedStudentWise", blacklistedStudentWise);
router.get("/ChiefWarden/autoApprovedAll", AutoApprovedAll);
router.get("/ChiefWarden/blacklistedGroupWise", blacklistedGroupWise);
router.get("/ChiefWarden/WardenGatepassDetails", wardenGatepassDetails);
router.get("/ChiefWarden/getAllGatePassesToday", getAllGatePassesToday);
router.get("/ChiefWarden/getHostelTowers/:hostel", getHostelTowers);
router.get("/ChiefWarden/getAllWardens", getAllWardens);


export default router;
