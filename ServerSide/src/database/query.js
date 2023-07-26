import { getAllCheckedOut } from "../controllers/guard.controller";

export const queries = {
  getAllUser: "SELECT * FROM [gps_db].[gps_db].[gps_usersmaster]",
  addUser: "INSERT INTO [gps_db].[gps_db].[gps_usersmaster] (user_id,ad_user_name,email_id,contact_number,group_id,role_id,subgroup_id,name,room_no,address,p_number,punch_id,change_flag,hostel,hostel_tower,status,photo) VALUES (@user_id,@ad_user_name,@email_id,@contact_number,@group_id,@role_id,@subgroup_id,@name,@room_no,@address,@p_number,@punch_id,@change_flag,@hostel,@hostel_tower,@status,@photo)",
  getUserById: "SELECT * FROM [gps_db].[gps_db].[gps_usersmaster] WHERE user_id=@user_id",
  getUserByEmail: "SELECT UM.*, PU.* FROM [gps_db].[gps_db].[gps_usersmaster] AS UM LEFT JOIN [gps_db].[gps_db].[gps_profileupdate] AS PU ON UM.user_id = PU.user_id WHERE UM.email_id = @email_id ;",
  deleteUser: "DELETE FROM [gps_db].[gps_db].[gps_usersmaster] WHERE user_id=@user_id",
  getTotalUser: "SELECT COUNT(*) FROM [gps_db].[gps_db].[gps_usersmaster]",
  updateUserById: "UPDATE [gps_db].[gps_db].[gps_usersmaster] SET ad_user_name=@ad_user_name,email_id=@email_id,contact_number=@contact_number,group_id=@group_id,role_id=@role_id,subgroup_id=@subgroup_id,name=@name,room_no=@room_no,address=@address,p_number=@p_number,punch_id=@punch_id,change_flag=@change_flag,hostel=@hostel,hostel_tower=@hostel_tower,status=@status,photo=@photo WHERE user_id=@user_id",



  /* __________________________________________________ADMIN DASHBOARD QUERIES__________________________________________________ */



  dashboardPendingRequest: "SELECT COUNT(*) AS TOTAL FROM [gps_db].[gps_db].[gps_gatepassmaster] WHERE status='Pending'",
  dashboardStudentInCampus: "SELECT COUNT(*) AS TOTAL FROM [gps_db].[gps_db].[gps_usersmaster] WHERE role_id = 1 AND ([gps_db].[gps_db].[gps_usersmaster].status = 'P' or [gps_db].[gps_db].[gps_usersmaster].status = 'PB');",
  dashboardStudentOutCampus: "SELECT COUNT(*) AS TOTAL FROM [gps_db].[gps_db].[gps_usersmaster] WHERE role_id = 1 AND status = 'A';",
  dashboardBlacklistStudent: "SELECT COUNT(*) AS TOTAL FROM [gps_db].[gps_db].[gps_blacklist_students] WHERE visibility = 1 AND CONVERT(date, GETDATE()) BETWEEN from_date AND to_date;",
  dashboardProfileRequest: "SELECT COUNT(*) AS TOTAL FROM [gps_db].[gps_db].[gps_profileupdate] WHERE status = 0;",
  dashboardTodayGatepass: "SELECT * FROM [gps_db].[gps_db].[gps_gatepassmaster] WHERE from_date = CONVERT(date, GETDATE());",
  dashboardAllPendingRequest: "SELECT [gps_db].[gps_db].[gps_usersmaster].user_id AS employee_id,[gps_db].[gps_db].[gps_usersmaster].name AS employee_name,COUNT(*) AS TOTAL FROM [gps_db].[gps_db].[gps_gatepassmaster], [gps_db].[gps_db].[gps_usersmaster] WHERE [gps_db].[gps_db].[gps_gatepassmaster].status = 'Pending' and [gps_db].[gps_db].[gps_usersmaster].user_id = [gps_db].[gps_db].[gps_gatepassmaster].send_approval_to GROUP BY [gps_db].[gps_db].[gps_usersmaster].user_id,[gps_db].[gps_db].[gps_usersmaster].name;",


  /* __________________________________________________ADMIN SETTINGS QUERIES__________________________________________________ */

  /////////////////////////////Group/Subgroup//////////////////////////////
  settingsGroup: "SELECT * FROM [gps_db].[gps_db].[gps_groups] WHERE gps_groupname NOT like '%alms%';",
  settingsSubgroup: "SELECT * FROM [gps_db].[gps_db].[gps_subgroup] WHERE subgroup_name NOT like '%NA%';",
  getGroupCount: "SELECT COUNT(*) AS TOTAL FROM [gps_db].[gps_db].[gps_groups]",
  getMaxSubgroupId: "SELECT MAX(subgroup_id) AS max_num FROM [gps_db].[gps_db].[gps_subgroup]",
  getSubgroupCount: "SELECT COUNT(*) AS TOTAL FROM [gps_db].[gps_db].[gps_subgroup]",
  getMaxGroupId: "SELECT MAX(gps_groupid) AS max_num FROM [gps_db].[gps_db].[gps_groups] WHERE gps_groupid < (SELECT MAX(gps_groupid) AS max_num FROM gps_db.gps_groups)",
  addGroup: "INSERT INTO [gps_db].[gps_db].[gps_groups] (gps_groupid,gps_groupname,gps_group_mastergroup_id) VALUES (@gps_groupid,@gps_groupname,@gps_group_mastergroup_id)",
  addSubgroup: "INSERT INTO [gps_db].[gps_db].[gps_subgroup] (subgroup_id,subgroup_name,subgroup_mastergroup_id) VALUES (@subgroup_id,@subgroup_name,@subgroup_mastergroup_id)",
  updateGroup: "UPDATE [gps_db].[gps_db].[gps_groups] SET gps_groupname = CASE WHEN (@new_group_name IS NOT NULL) THEN @new_group_name ELSE gps_groupname END WHERE gps_groupid=@group_id",
  updateSubGroup: "UPDATE [gps_db].[gps_db].[gps_subgroup] SET subgroup_name = CASE WHEN (@new_subGroup_name IS NOT NULL) THEN @new_subGroup_name ELSE subgroup_name END WHERE subgroup_id=@subGroup_id",

  deleteGroup: "DELETE FROM [gps_db].[gps_db].[gps_groups] WHERE gps_groupid=@id;",
  deleteSubgroup: "DELETE FROM [gps_db].[gps_db].[gps_subgroup] WHERE subgroup_id=@id;",

  getAllMasterGroups: "select * from gps_db.gps_mastergroups;",
  getAllGroups: "select gps_groupname as groupname, gps_group_mastergroup_id as mastergroup_id from gps_db.gps_groups;",
  getAllSubGroups: "SELECT [subgroup_name],[subgroup_mastergroup_id] as mastergroup_id FROM [gps_db].[gps_db].[gps_subgroup]",
  getAllusers: "SELECT * FROM [gps_db].[gps_db].[gps_usersmaster]",

  /////////////////////////////Roles//////////////////////////////
  settingsAllRole: "SELECT * FROM [gps_db].[gps_db].[gps_roles];",
  settingsUserRole: "SELECT [gps_db].[gps_db].[gps_usersmaster].user_id AS employeecode, [gps_db].[gps_db].[gps_usersmaster].name AS employeename, [gps_db].[gps_db].[gps_usersmaster].status AS employeestatus,[gps_db].[gps_db].[gps_roles].role_name AS employeerole, [gps_db].[gps_db].[gps_roles].role_id AS roleid FROM [gps_db].[gps_db].[gps_usersmaster],[gps_db].[gps_db].[gps_roles] WHERE gps_usersmaster.role_id != 1 and [gps_db].[gps_db].[gps_usersmaster].role_id = [gps_db].[gps_db].[gps_roles].role_id;",
  settingsAllStatus: "select DISTINCT [gps_db].[gps_db].[gps_usersmaster].status from [gps_db].[gps_db].[gps_usersmaster];",
  updateRoleStatus: "UPDATE [gps_db].[gps_usersmaster] SET role_id = CASE WHEN (role_id != @role_id AND @role_id IS NOT NULL) THEN @role_id else role_id END, status = CASE WHEN (status != @status AND @status IS NOT NULL) THEN @status else status END WHERE user_id = @user_id;",
  /////////////////////////////Param Config//////////////////////////////
  settingsParameterConfig: "SELECT * FROM [gps_db].[gps_db].[gps_configmaster]",
  updateParameterConfig: "UPDATE [gps_db].[gps_db].[gps_configmaster] SET value=@value WHERE param_id=@param_id;",
  // addUser: "INSERT INTO [gps_db].[gps_db].[gps_usersmaster] (user_id,ad_user_name,email_id,contact_number,group_id,role_id,subgroup_id,name,room_no,address,p_number,punch_id,change_flag,hostel,hostel_tower,status,photo) VALUES (@user_id,@ad_user_name,@email_id,@contact_number,@group_id,@role_id,@subgroup_id,@name,@room_no,@address,@p_number,@punch_id,@change_flag,@hostel,@hostel_tower,@status,@photo);",
  // updateUser: "UPDATE [gps_db].[gps_db].[gps_usersmaster] SET ad_user_name=@ad_user_name,email_id=@email_id,contact_number=@contact_number,group_id=@group_id,role_id=@role_id,subgroup_id=@subgroup_id,name=@name,room_no=@room_no,address=@address,p_number=@p_number,punch_id=@punch_id,change_flag=@change_flag,hostel=@hostel,hostel_tower=@hostel_tower,status=@status,photo=@photo WHERE user_id=@user_id;",


  /////////////////////////////Users//////////////////////////////
  updateUser: "UPDATE [gps_db].[gps_db].[gps_usersmaster] SET role_id = CASE WHEN (@role_id IS NOT NULL) THEN @role_id else role_id END, group_id = CASE WHEN (@group_id IS NOT NULL) THEN @group_id else group_id END ,subgroup_id = CASE WHEN (@subgroup_id IS NOT NULL) THEN @subgroup_id else subgroup_id END , room_no = @room_no, hostel = @hostel, contact_number = @contact_number, p_number =  CASE WHEN (@p_number IS NOT NULL) THEN @p_number else p_number END WHERE user_id = @user_id;",

  /* __________________________________________________ADMIN REPORT QUERIES__________________________________________________ */



  reportStudentTenureWise: "SELECT * FROM [gps_db].[gps_db].[gps_gatepassmaster] WHERE user_id=@user_id AND applied_date BETWEEN @date_start AND @date_end;",
  reportStundentStatusWise: "SELECT * FROM [gps_db].[gps_db].[gps_gatepassmaster] WHERE status=@statuslist AND [gps_db].[gps_db].[gps_gatepassmaster].applied_date BETWEEN @date_start AND @date_end ORDER BY applied_date DESC;",
  reportStundentStatusTenureWise: "SELECT * FROM [gps_db].[gps_db].[gps_gatepassmaster] WHERE status=@statuslist AND user_id=@user_id AND [gps_db].[gps_db].[gps_gatepassmaster].applied_date BETWEEN @date_start AND @date_end;",
  reportGatepassTypeWise: "SELECT * FROM [gps_db].[gps_db].[gps_gatepassmaster] WHERE gatepass_type = @gpt AND applied_date BETWEEN @date_start AND @date_end;",
  reportBlacklistedStudentDateWise: "SELECT * FROM [gps_db].[gps_db].[gps_blacklist_students] WHERE [gps_db].[gps_db].[gps_blacklist_students].from_date BETWEEN @date_start AND @date_end;",
  reportBlacklistedGroupDateWise: "SELECT * FROM [gps_db].[gps_db].[gps_blacklistgroup] WHERE [gps_db].[gps_db].[gps_blacklistgroup].from_date BETWEEN @date_start AND @date_end;",
  reportDefaulterDateWise: "SELECT * FROM [gps_db].[gps_db].[gps_defaulter_students], [gps_db].[gps_db].[gps_gatepassmaster] WHERE [gps_db].[gps_db].[gps_defaulter_students].request_id = [gps_db].[gps_db].[gps_gatepassmaster].request_id AND [gps_db].[gps_db].[gps_gatepassmaster].from_date BETWEEN @date_start AND @date_end;",
  reportEOD: "SELECT * FROM [gps_db].[gps_db].[gps_gatepassmaster] WHERE [gps_db].[gps_db].[gps_gatepassmaster].applied_date = @date;",
  reportWarden: "SELECT * FROM [gps_db].[gps_db].[gps_gatepassmaster] WHERE (send_approval_to = @user_id OR approved_or_rejected_by = @user_id) AND applied_date BETWEEN @date_start AND @date_end;",

  /* __________________________________________________Blacklist Student QUERIES__________________________________________________ */

  addBlacklistedStudent: "INSERT INTO [gps_db].[gps_db].[gps_blacklist_students] (user_id,from_date,from_time,to_date,to_time,blacklisted_by,remark,visibility) VALUES (@user_id,@from_date,@from_time,@to_date,@to_time,@blacklisted_by,@remark,@visibility) UPDATE [gps_db].[gps_db].[gps_usersmaster] SET status = 'PB' where user_id=@user_id;",
  getBlackListStudents: "SELECT user_id FROM [gps_db].[gps_db].[gps_blacklist_students] WHERE user_id=@id ",

  /* __________________________________________________Student QUERIES__________________________________________________ */

  cancelGatepass: "UPDATE [gps_db].[gps_db].[gps_gatepassmaster] SET status='Cancelled' WHERE request_id=@id;",
  expireGatepass: "UPDATE [gps_db].[gps_db].[gps_gatepassmaster] SET status='Expire' WHERE request_id=@id;",
  recentGatepass: "SELECT TOP 5 status , GP.comments , GP.applied_date , GP.applied_time , GT.gatepass_name , GP.from_date , GP.from_time FROM [gps_db].[gps_db].[gps_gatepassmaster] AS GP INNER JOIN [gps_db].[gps_db].[gps_gatepass_type] AS GT ON GP.gatepass_type = GT.gatepass_type  WHERE user_id=@id ORDER BY applied_date DESC , applied_time DESC;",
  getDashboardDetails: "SELECT * FROM [gps_db].[gps_db].[gps_usersmaster] AS UM LEFT JOIN [gps_db].[gps_db].[gps_profileupdate] AS PU ON UM.user_id = PU.user_id WHERE UM.email_id = @email;",
  getAllStudentGatepasses: "SELECT GM.request_id, GT.gatepass_name, GM.from_time, GM.from_date, GM.to_time, GM.to_date, UM.name as requested_to, GM.purpose, GM.status, GM.visit_to, GM.destination, GM.destination_contact, GM.applied_date, GM.applied_time, UM2.name as approved_by, GM.approved_or_rejected_date, GM.approved_or_rejected_time, GM.actual_in_date, GM.actual_in_time, GM.actual_out_date, GM.actual_out_time, GM.comments, GM.defaulter_flag FROM [gps_db].[gps_db].[gps_gatepassmaster] AS GM INNER JOIN [gps_db].[gps_db].[gps_gatepass_type] AS GT ON GM.gatepass_type=GT.gatepass_type FULL OUTER JOIN [gps_db].[gps_db].[gps_usersmaster] AS UM ON GM.send_approval_to=UM.user_id FULL OUTER JOIN [gps_db].[gps_db].[gps_usersmaster] AS UM2 ON GM.approved_or_rejected_by=UM2.user_id WHERE GM.user_id=@user_id;",

  /* __________________________________________________LocalFlexible QUERIES__________________________________________________ */
  getWardenDetails: "SELECT HG.alloted_warden, UM2.contact_number, UM2.name AS warden_name FROM [gps_db].[gps_db].[gps_hostalgroups] AS HG INNER JOIN [gps_db].[gps_db].[gps_usersmaster] AS UM1 ON (HG.masterhostal_name = UM1.hostel AND REPLACE(REPLACE(HG.mastertowername,char(10),''),char(13),'') = UM1.hostel_tower) INNER JOIN gps_db.gps_usersmaster AS UM2 ON (HG.alloted_warden = UM2.user_id) WHERE UM1.user_id=@user_id;",
  checkGatepassStatus: "SELECT COUNT(*) as count, status FROM [gps_db].[gps_db].[gps_gatepassmaster] where user_id=@user_id and (status='CHECKEDOUT' OR (status in ('Approved', 'Pending') AND gatepass_type IN (2,3))) GROUP BY status;",
  applyLocalFlexibleGatepass:"INSERT INTO [gps_db].[gps_db].[gps_gatepassmaster] (user_id,punch_id,gatepass_type,from_date,from_time,to_date,to_time, purpose, destination, visit_to, send_approval_to, applied_date, applied_time, status, approved_or_rejected_date, approved_or_rejected_time, comments, actual_out_date, actual_out_time, actual_in_date, actual_in_time, defaulter_flag, defaulter_warden) VALUES (@user_id, @punch_id, @gatepass_type, @from_date, @from_time, @to_date, @to_time, @purpose, @destination, 'NEEMRANA', @approval_to, @applied_date, @applied_time, 'Pending', '0000-00-00', '00:00:00', 'NA', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 0, 0 );",

  /* __________________________________________________Warden QUERIES__________________________________________________ */

  approveGatepass: "UPDATE [gps_db].[gps_db].[gps_gatepassmaster] SET status='Approved', approved_or_rejected_by=@approved_or_rejected_by, approved_or_rejected_date=@approved_or_rejected_date, approved_or_rejected_time=@approved_or_rejected_time, comments=@comments where request_id=@request_id;",
  getAllGatepasses:"SELECT GM.request_id, UM.contact_number, UM.p_number, UM.name, UM.user_id, GT.gatepass_name, GM.from_date, GM.from_time, GM.to_date, GM.to_time, GM.status, GM.approved_or_rejected_date, GM.approved_or_rejected_time, GM.destination, GM.visit_to, GM.purpose, GM.destination_contact, GG.gps_groupname, GM.comments from [gps_db].[gps_db].[gps_gatepassmaster] AS GM INNER JOIN [gps_db].[gps_db].[gps_usersmaster] AS UM ON GM.user_id=UM.user_id INNER JOIN [gps_db].[gps_db].[gps_gatepass_type] AS GT ON GM.gatepass_type=GT.gatepass_type INNER JOIN [gps_db].[gps_db].[gps_groups] AS GG ON UM.group_id=GG.gps_groupid WHERE GM.status IN ('REJECTED','CANCELLED','Approved') AND GM.approved_or_rejected_by=@approved_or_rejected_by;",
  rejectGatepass:"UPDATE [gps_db].[gps_db].[gps_gatepassmaster] SET status='Rejected', approved_or_rejected_by=@approved_or_rejected_by, approved_or_rejected_date=@approved_or_rejected_date, approved_or_rejected_time=@approved_or_rejected_time, comments=@comments where request_id=@request_id;",
  getPendingGatepass: "SELECT GM.request_id,UM1.name as name, UM1.contact_number, UM1.p_number, UM1.user_id, GT.gatepass_name, GM.applied_date, GM.applied_time, GM.from_date, GM.from_time, GM.to_date, GM.to_time, GM.destination, GM.visit_to, GM.purpose, GM.destination_contact, UM2.name as Requested_to from [gps_db].[gps_db].[gps_gatepassmaster] AS GM INNER JOIN [gps_db].[gps_db].[gps_usersmaster] AS UM1 ON GM.user_id=UM1.user_id INNER JOIN [gps_db].[gps_db].[gps_usersmaster] AS UM2 ON GM.send_approval_to=UM2.user_id INNER JOIN [gps_db].[gps_db].[gps_gatepass_type] AS GT ON GM.gatepass_type=GT.gatepass_type WHERE GM.status IN ('Pending') AND GM.send_approval_to=@approval_to;",
  getCurrentAutoApprovedBatches: "SELECT GG.gps_groupname, GS.subgroup_name, GA.from_date, GA.from_time, GA.to_date, GA.to_time, UM.name from [gps_db].[gps_db].[gps_autoapprove] AS GA INNER JOIN [gps_db].[gps_db].[gps_groups] AS GG ON GA.group_id=GG.gps_groupid INNER JOIN [gps_db].[gps_db].[gps_usersmaster] AS UM ON GA.approved_by=UM.user_id INNER JOIN [gps_db].[gps_db].[gps_subgroup] AS GS ON GS.subgroup_id=GA.subgroup_id WHERE GA.visibility=1 and CONVERT(DATETIME, CONVERT(CHAR(8), GA.to_date, 112) + ' ' + CONVERT(CHAR(8), GA.to_time, 108))>=GETDATE();",
  getDashboardOthers: "SELECT GM.request_id, UM1.name as name,UM1.contact_number,UM1.p_number, UM1.user_id, GT.gatepass_name, GM.applied_date, GM.applied_time, GM.from_date, GM.from_time,GM.status, GM.to_date, GM.to_time, GM.destination, GM.visit_to, GM.purpose, GM.destination_contact, UM2.name as Requested_to from [gps_db].[gps_db].[gps_gatepassmaster] AS GM  INNER JOIN [gps_db].[gps_db].[gps_usersmaster] AS UM1 ON GM.user_id=UM1.user_id INNER JOIN [gps_db].[gps_db].[gps_usersmaster] AS UM2 ON GM.send_approval_to=UM2.user_id INNER JOIN [gps_db].[gps_db].[gps_gatepass_type] AS GT ON GM.gatepass_type=GT.gatepass_type WHERE GM.status IN ('Pending') AND GM.send_approval_to!=@approval_to;",
  /* __________________________________________________Chief Warden QUERIES__________________________________________________ */
  getBlacklistedStudentWise: "SELECT GBS.blacklist_id, UM1.name,GBS.user_id ,GBS.from_date, GBS.from_time, GBS.to_date, GBS.to_time, UM2.name as blacklisted_by, GBS.remark from [gps_db].[gps_db].[gps_blacklist_students] AS GBS INNER JOIN [gps_db].[gps_db].[gps_usersmaster] AS UM1 ON GBS.user_id=UM1.user_id INNER JOIN [gps_db].[gps_db].[gps_usersmaster] AS UM2 ON GBS.blacklisted_by=UM2.user_id  where CONVERT(DATETIME, CONVERT(CHAR(8), GBS.to_date, 112) + ' ' + CONVERT(CHAR(8), GBS.to_time, 108))>=GETDATE();",
  getBlacklistedGroupWise: "SELECT GB.transactionid as blacklist_id,GG.gps_groupname as groupName, GS.subgroup_name as subgroup, GB.from_date, GB.from_time, GB.to_date, GB.to_time, UM.name from [gps_db].[gps_db].[gps_blacklistgroup] AS GB INNER JOIN [gps_db].[gps_db].[gps_groups] AS GG ON GB.group_id=GG.gps_groupid INNER JOIN [gps_db].[gps_db].[gps_usersmaster] AS UM ON GB.blacklisted_by=UM.user_id INNER JOIN [gps_db].[gps_db].[gps_subgroup] AS GS ON GS.subgroup_id=GB.subgroup_id where CONVERT(DATETIME, CONVERT(CHAR(8), GB.to_date, 112) + ' ' + CONVERT(CHAR(8), GB.to_time, 108))>=GETDATE();",
  getAutoApprovedAll:"SELECT GG.gps_groupname as groupName, GS.subgroup_name as subGroup, GA.from_date, GA.from_time, GA.to_date, GA.to_time, UM.name from [gps_db].[gps_db].[gps_autoapprove] AS GA INNER JOIN [gps_db].[gps_db].[gps_groups] AS GG ON GA.group_id=GG.gps_groupid INNER JOIN [gps_db].[gps_db].[gps_usersmaster] AS UM ON GA.approved_by=UM.user_id INNER JOIN [gps_db].[gps_db].[gps_subgroup] AS GS ON GS.subgroup_id=GA.subgroup_id WHERE GA.visibility=1 ",
  getWardenGatepassDetails:"SELECT UM.name,(SELECT COUNT(*)FROM  gps_db.gps_db.gps_gatepassmaster as GM WHERE GM.send_approval_to = UM.user_id and GM.status in ('Pending') and GM.applied_date=FORMAT(GetDate(), 'yyyy-MM-dd')) as pending_requests,(SELECT COUNT(*)FROM  gps_db.gps_db.gps_gatepassmaster as GM WHERE  GM.approved_or_rejected_by=UM.user_id and GM.approved_or_rejected_date=FORMAT(GetDate(), 'yyyy-MM-dd'))as serviced_requests FROM gps_db.gps_db.gps_usersmaster as UM where UM.role_id=2;",
  getAllGatepassesToday:"SELECT GM.request_id,GM.applied_date, UM1.contact_number, UM1.p_number, UM1.name, UM1.user_id,UM2.name as Requested_to, GT.gatepass_name, GM.from_date, GM.from_time, GM.to_date, GM.to_time, GM.status, GM.approved_or_rejected_date, GM.approved_or_rejected_time, GM.destination, GM.visit_to, GM.purpose, GM.destination_contact, GM.comments from [gps_db].[gps_db].[gps_gatepassmaster] AS GM Inner JOIN [gps_db].[gps_db].[gps_usersmaster] AS UM1 ON GM.user_id=UM1.user_id  Left Join gps_db.gps_usersmaster as UM2 on GM.send_approval_to=UM2.user_id  INNER JOIN [gps_db].[gps_db].[gps_gatepass_type] AS GT ON GM.gatepass_type=GT.gatepass_type  WHERE GM.applied_date=FORMAT(GETDATE(),'yyyy-MM-dd');",
  getHostelTowers:"SELECT distinct [mastertowername], masterhostal_id FROM [gps_db].[gps_db].[gps_hostalgroups] where masterhostal_name=@hostel;",
  getAllWardens:"SELECT UM.name as warden_name ,UM.user_id FROM [gps_db].[gps_db].[gps_usersmaster] AS UM WHERE UM.role_id=2;",
  getAllottedTowersReport:"SELECT [mastertowername] ,[masterhostal_name] ,[warden_name] FROM [gps_db].[gps_db].[gps_hostalgroups] order by masterhostal_name;",
  insertTowerWarden:" UPDATE [gps_db].[gps_hostalgroups] SET [alloted_warden] = @warden_id,[warden_name] = @warden_name,[permanent_warden] = @warden_id WHERE masterhostal_name=@hostel_name and masterhostal_id=@hostel_id;",
  /* __________________________________________________Local Fixed QUERIES__________________________________________________ */
  applyLocalFixedGatepass: "INSERT INTO [gps_db].[gps_db].[gps_gatepassmaster] (user_id,punch_id,gatepass_type,from_date,from_time,to_date,to_time, purpose, destination, visit_to, applied_date, applied_time, status, approved_or_rejected_date, approved_or_rejected_time, comments, actual_out_date, actual_out_time, actual_in_date, actual_in_time, defaulter_flag, defaulter_warden, send_approval_to) VALUES (@user_id, @punch_id, 1, @from_date, @from_time, @to_date, @to_time, 'Local Visit', 'NEEMRANA', 'NEEMRANA',@applied_date, @applied_time,'AutoApproved', '0000-00-00', '00:00:00', 'NA', '0000-00-00', '00:00:00', '0000-00-00', '00:00:00', 0, 0, '7000' );",
  getNumberOfLocalFixedConfig: "SELECT value from [gps_db].[gps_db].[gps_configmaster] WHERE parameter='Week Limit'",
  getLocalFixedOutTime: "SELECT value from [gps_db].[gps_db].[gps_configmaster] WHERE parameter='Out Time'",
  getLocalFixedInTime: "SELECT value from [gps_db].[gps_db].[gps_configmaster] WHERE parameter='In Time'",
  getNumberOfLocalFixedStudent: "SELECT COUNT(*) as total from [gps_db].[gps_db].[gps_gatepassmaster] WHERE gatepass_type='1' AND user_id=@user_id  AND (applied_date between @dateLowerBound AND @dateUpperBound) AND STATUS IN ('AutoApproved','CHECKEDIN','CHECKEDOUT') AND STATUS NOT IN ('Cancelled','Rejected','Expire') AND actual_out_date != '0000-00-00';",
  studentCheckedoutOrAutoapproved: "SELECT * from [gps_db].[gps_db].[gps_gatepassmaster] where status in ('AutoApproved', 'CHECKEDOUT') AND gatepass_type=1 AND user_id=@user_id",

  /* __________________________________________________GUARD QUERIES__________________________________________________ */
  getApprovedStudents: "SELECT GM.request_id, GM.punch_id, UM.name, UM.contact_number, UM.user_id, GT.gatepass_name, GM.from_date, GM.from_time, GM.to_date, GM.to_time, GM.status, PU.image FROM [gps_db].[gps_db].[gps_gatepassmaster] AS GM INNER JOIN [gps_db].[gps_db].[gps_usersmaster] AS UM ON GM.user_id = UM.user_id INNER JOIN [gps_db].[gps_db].[gps_gatepass_type] AS GT ON GM.gatepass_type = GT.gatepass_type LEFT JOIN [gps_db].[gps_db].[gps_profileupdate] AS PU ON GM.user_id = PU.user_id WHERE GM.status IN ('APPROVED', 'AUTOAPPROVED') AND CONVERT(DATETIME, CONVERT(CHAR(8), GM.from_date, 112) + ' ' + CONVERT(CHAR(8), GM.from_time, 108)) <= GETDATE() AND (PU.status = 1 OR PU.status IS NULL);",
  getCheckedOutStudents: "SELECT GM.request_id, UM.name, UM.contact_number, UM.user_id, GT.gatepass_name, GM.actual_out_date, GM.actual_out_time, GM.to_date, GM.to_time, GM.status, PU.image FROM [gps_db].[gps_db].[gps_gatepassmaster] AS GM INNER JOIN [gps_db].[gps_db].[gps_usersmaster] AS UM ON GM.user_id = UM.user_id INNER JOIN [gps_db].[gps_db].[gps_gatepass_type] AS GT ON GM.gatepass_type = GT.gatepass_type LEFT JOIN [gps_db].[gps_db].[gps_profileupdate] AS PU ON GM.user_id = PU.user_id WHERE GM.status = 'CHECKEDOUT' AND GM.gatepass_type != 4;",

  studentCheckout: "UPDATE [gps_db].[gps_db].[gps_gatepassmaster] SET check_out_by =@check_out_by, actual_out_date =@actual_out_date, actual_out_time=@actual_out_time, status='CHECKEDOUT' WHERE status IN ('approved', 'autoapproved') AND user_id=@user_id and request_id=@request_id;",
  studentCheckin: "UPDATE [gps_db].[gps_db].[gps_gatepassmaster] SET check_in_by=@check_in_by, actual_in_date=@actual_in_date, actual_in_time=@actual_in_time, status='CHECKEDIN' where status in ('checkedout') AND user_id=@user_id AND request_id=@request_id;",
  updateUserStatusCheckout: "UPDATE [gps_db].[gps_db].[gps_usersmaster] SET status='A' WHERE user_id=@user_id",
  updateUserStatusCheckin: "UPDATE [gps_db].[gps_db].[gps_usersmaster] SET status='P' WHERE user_id=@user_id",
  updateUserStatusNonReturnable: "UPDATE [gps_db].[gps_db].[gps_usersmaster] SET status='G' WHERE user_id=@user_id",
  updateDefaulterFlag: "UPDATE [gps_db].[gps_db].[gps_gatepassmaster] SET defaulter_flag = CASE WHEN TRY_CAST(actual_in_date AS DATE) < TRY_CAST(to_date AS DATE) OR (TRY_CAST(actual_in_date AS DATE) = TRY_CAST(to_date AS DATE) AND TRY_CAST(actual_in_time AS TIME) <= TRY_CAST(to_time AS TIME)) THEN 0 ELSE 1 END where user_id=@user_id AND request_id=@request_id and status = 'checkedin'; ",
  /* __________________________________________________GUARD DASHBOARD QUERIES__________________________________________________ */
  dashboardApprovedToday: "SELECT COUNT(*) AS TOTAL from [gps_db].[gps_db].[gps_gatepassmaster] where status in ('Approved','AutoApproved') and (approved_or_rejected_date<=(CONVERT(VARCHAR, GETDATE(), 23)) and from_date<=(CONVERT(VARCHAR, GETDATE(), 23)));",
  dashboardStudentsReturning: "SELECT COUNT(*) AS TOTAL from [gps_db].[gps_db].[gps_gatepassmaster] where to_date=CONVERT(VARCHAR, GETDATE(), 23) and to_time<='23:59:59' and status in ('CHECKEDOUT');",

  /* __________________________________________________AUTH QUERIES__________________________________________________ */
  getUserInformation: "SELECT * FROM [gps_db].[gps_db].[gps_usersmaster] WHERE email_id=@email_id",

  /* __________________________________________________LOGOUT QUERY__________________________________________________ */

  insertLoggedOutJWT: "INSERT INTO [gps_db].[gps_db].[gps_logged_out_jwts] (jwt) VALUES (@jwt);",
  getBlacklistedJwt: "SELECT COUNT(*) as TOTAL FROM [gps_db].[gps_db].[gps_logged_out_jwts] WHERE jwt=@jwt"
};
