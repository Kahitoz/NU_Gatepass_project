import { Router } from "express";
import {
    getPendingRequest,
    getStudentInCampus,
    getStudentOutCampus,
    getBlacklistedStudent,
    getProfileRequest,
    getTodayGatepass,
    getAllPendingRequest,

    getGroup,
    getSubgroup,
    createGroup,
    createSubgroup,
    deleteGroup,
    deleteSubgroup,
    getAllRole,
    getUserRole,
    getAllStatus,
    getParameterConfig,
    updateWeekLimit,
    updateOutTime,
    updateInTime,
    updateArrivalRestrictUB,
    updateArrivalRestrictLB,
    updateFlexibleEntry,

    createUser,
    updateUser,

    getStudentTenureWise,
    getStudentTenureWiseDownload,
    getStudentStatusWise,
    getStudentStatusTenureWise,
    getGatepassTypeWise,
    getBlacklistedStudentDateWise,
    getBlacklistedGroupDateWise,
    getDefaulterDateWise,
    getEOD,
    getWarden,
    getAllGroups,
    getAllSubGroups,
    getAllUsers,

    createBlacklistedStudent,
    updateRoleAndStatus,
    updateGroup,
    updateSubGroup,
    getUserDetails,
    getAllMasterGroups,

} from "../controllers/admin.controller"

const router = Router();

/* __________________________________________________DASHBOARD ROUTES__________________________________________________ */

router.get('/admin/pending_request', getPendingRequest);
router.get('/admin/student_in_campus', getStudentInCampus);
router.get('/admin/student_out_campus', getStudentOutCampus);
router.get('/admin/blacklist_student', getBlacklistedStudent);
router.get('/admin/profile_request', getProfileRequest);
router.get('/admin/today_gatepass', getTodayGatepass);
router.get('/admin/all_pending_request', getAllPendingRequest);





/* __________________________________________________SETTINGS ROUTES__________________________________________________ */



/////////////Group/Subgroup//////////////////
router.get('/admin/group', getGroup);
router.post('/admin/create_group', createGroup);
router.delete('/admin/group/:id', deleteGroup);
router.get('/admin/subgroup', getSubgroup);
router.post('/admin/create_subgroup', createSubgroup);
router.delete('/admin/subgroup/:id', deleteSubgroup);
router.put('/admin/update_group/:group_id', updateGroup);
router.put('/admin/update_subgroup/:subGroup_id', updateSubGroup);
//////////////Roles///////////////////////////
router.get('/admin/all_role', getAllRole);
router.get('/admin/user_role', getUserRole);
router.put('/admin/update_role_and_status', updateRoleAndStatus)
/////////////Param Config/////////////////////
router.get('/admin/parameter_config', getParameterConfig);
router.put('/admin/parameter_config/week_limit/:param_id', updateWeekLimit);
router.put('/admin/parameter_config/out_time/:param_id', updateOutTime);
router.put('/admin/parameter_config/in_time/:param_id', updateInTime);
router.put('/admin/parameter_config/arrival_restrict_ub/:param_id', updateArrivalRestrictUB);
router.put('/admin/parameter_config/arrival_restrict_lb/:param_id', updateArrivalRestrictLB);
router.put('/admin/parameter_config/flexible_entry/:param_id', updateFlexibleEntry);
//////////////Users///////////////////////////
router.get('/admin/all_status', getAllStatus);
router.put('/admin/update_user/:user_id', updateUser);
router.get('/admin/user_info/:user_id', getUserDetails)

router.post('/admin/user', createUser);




router.get('/admin/tenure_wise_student_report/:id/:sd/:ed', getStudentTenureWise);
router.get('/admin/tenure_wise_student_report/download/:id/:sd/:ed', getStudentTenureWiseDownload);
router.get('/admin/status_wise_student_report/:statuslist/:sd/:ed', getStudentStatusWise);
router.get('/admin/status_and_tenure_wise_student_report/:statuslist/:id/:sd/:ed', getStudentStatusTenureWise);
router.get('/admin/gatepass_type_report/:gpt/:sd/:ed', getGatepassTypeWise);
router.get('/admin/blacklisted_student_date_wise_report/:sd/:ed', getBlacklistedStudentDateWise);
router.get('/admin/blacklisted_group_date_wise_report/:sd/:ed', getBlacklistedGroupDateWise);
router.get('/admin/defaulter_date_wise_report/:sd/:ed', getDefaulterDateWise);
router.get('/admin/eod_report/:date', getEOD);
router.get('/admin/warden_report/:id/:sd/:ed', getWarden);
router.get('/admin/getAllMasterGroups', getAllMasterGroups)


router.post('/admin/blacklist_student', createBlacklistedStudent);
router.get('/admin/get_all_groups', getAllGroups);
router.get('/admin/get_all_sub_groups', getAllSubGroups);
router.get('/admin/get_all_users', getAllUsers);
export default router;