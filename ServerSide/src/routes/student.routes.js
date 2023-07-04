import { Router } from "express";
import {
  applyLocalFixedGatepass,
  applyLocalFlexibleGatepass,
  gatepassCancel,
  gatepassExpire,
  getRecentGatepass,
  getDashboardDetails,
  getBlacklistStudentBool,
  testQuery,
  getNumberOfLocalFixed,
  getNumberOfLocalFixedConfig,
  getLocalFixedOutTime,
  getLocalFixedInTime,
  getNumberOfLocalFixedStudent,
  getStudentCheckedoutOrApproved,
  getDates,
  getWardenDetails,
  getGatepassStatusForLocalFlexible,
  getAllStudentGatepasses,
  getImage,
} from "../controllers/student.controller";

const router = Router();
const __dirname="/ServerSide/src/images";

router.get("/student/recent_gatepass/", getRecentGatepass);
router.get("/student/dashboard_details", getDashboardDetails);

// router.post("/student/local_fixed_gatepass", applyLocalFixedGatepass);
// router.post("/student/local_flexible_gatepass", applyLocalFlexibleGatepass);
router.get("/student/gatepass_cancel/", gatepassCancel);
router.get("/student/gatepass_expire/", gatepassExpire);
router.get("/student/blacklisted/", getBlacklistStudentBool);

router.get("/student/get_number_of_local_fixed_config/",getNumberOfLocalFixedConfig);
router.get("/student/get_local_fixed_outtime/", getLocalFixedOutTime);
router.get("/student/get_local_fixed_intime/", getLocalFixedInTime);
router.get("/student/get_number_of_local_fixed_student/:dateLowerBound/:dateUpperBound",getNumberOfLocalFixedStudent);
router.get("/student/get_bool_student_checkedout_autoapproved", getStudentCheckedoutOrApproved);
router.get("/student/get_dates", getDates)
router.get("/student/get_warden_details", getWardenDetails)
router.get("/student/get_gatepass_status_for_localflexible", getGatepassStatusForLocalFlexible)
router.get("/student/get_all_student_gatepasses", getAllStudentGatepasses)

router.post("/student/apply_local_fixed/", applyLocalFixedGatepass);
router.post("/student/apply_local_flexible", applyLocalFlexibleGatepass);
router.get('/student/image', getImage);

export default router;
