import { Router } from "express";
import { 
    getPendingGatepass,gatepassApproveOrReject, rejectGatepass, getApprovedGatepass, approveGatepass, getDashboardOthers, getCurrentAutoApprovedBatches, getDashboardMy, getAllGatepasses } from "../controllers/warden.controller"



const router = Router();

router.get("/warden/gatepass_approve_or_reject/:id/:flag", gatepassApproveOrReject);
router.put("/warden/approve_gatepass", approveGatepass);
router.put('/warden/reject_Gatepass', rejectGatepass) // requires gatepass req_id and comments from the client
router.get('/warden/get_all_gatepass', getAllGatepasses);
router.get("/warden/get_dashboard_my", getDashboardMy);
router.get("/warden/get_dashboard_others", getDashboardOthers);
router.get("/warden/auto_approved_batches",getCurrentAutoApprovedBatches);

export default router;
