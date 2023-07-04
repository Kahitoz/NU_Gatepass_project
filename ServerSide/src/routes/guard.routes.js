import { Router } from "express";
import {
  getAllApproved,
  getAllCheckedOut,
  getApprovedToday,
  getBlacklistedStudent,
  getStudentInCampus,
  getStudentsReturning,
  studentCheckin,
  studentCheckout,
  updateUserStatusCheckout,
  updateUserStatusCheckin,
  updateDefaulterFlag,
} from "../controllers/guard.controller";

const router = Router();

/* __________________________________________________CHECK OUT ROUTES__________________________________________________ */

router.get("/guard/approved_students", getAllApproved);
router.put("/guard/checkout_student", studentCheckout);
router.put("/guard/update_user_status_absent", updateUserStatusCheckout);

/* __________________________________________________CHECK IN ROUTES__________________________________________________ */
router.get("/guard/checked_out_students", getAllCheckedOut);
router.put("/guard/checkin_student", studentCheckin);
router.put("/guard/update_user_status_present", updateUserStatusCheckin);
router.put("/guard/update_defaulter_flag", updateDefaulterFlag);

/* __________________________________________________DASHBOARD ROUTES__________________________________________________ */
router.get("/guard/approved_today", getApprovedToday);
router.get("/guard/returning_today", getStudentsReturning);
router.get("/guard/students_in_campus", getStudentInCampus);
router.get("/guard/blacklist_students", getBlacklistedStudent);

export default router;
