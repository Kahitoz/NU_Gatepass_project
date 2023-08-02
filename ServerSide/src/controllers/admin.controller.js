import { getConnection, sql, queries } from "../database";
const date = require("date-and-time");
const xl = require("excel4node");

/* __________________________________________________DASHBOARD API__________________________________________________ */

export const getPendingRequest = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.dashboardPendingRequest);
    return res.json(result.recordset[0]["TOTAL"]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getStudentInCampus = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.dashboardStudentInCampus);
    return res.json(result.recordset[0]["TOTAL"]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getStudentOutCampus = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(queries.dashboardStudentOutCampus);
    return res.json(result.recordset[0]["TOTAL"]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getBlacklistedStudent = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(queries.dashboardBlacklistStudent);
    return res.json(result.recordset[0]["TOTAL"]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getProfileRequest = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.dashboardProfileRequest);
    return res.json(result.recordset[0]["TOTAL"]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getTodayGatepass = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.dashboardTodayGatepass);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getAllPendingRequest = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(queries.dashboardAllPendingRequest);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/* __________________________________________________SETTINGS API__________________________________________________ */

/* ##################Groups/Subgroup API##################  */
export const getGroup = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.settingsGroup);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getSubgroup = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.settingsSubgroup);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createGroup = async (req, res) => {
  const { gps_groupname, gps_group_mastergroup_id } = req.body;

  // validating
  if (gps_groupname == null || gps_group_mastergroup_id === null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    let count = await pool.request().query(queries.getMaxGroupId);

    const gps_groupid = count.recordset[0].max_num + 1;

    const result = await pool
      .request()
      .input("gps_groupid", sql.Int, gps_groupid)
      .input("gps_groupname", sql.VarChar, gps_groupname)
      .input("gps_group_mastergroup_id", sql.Int, gps_group_mastergroup_id)
      .query(queries.addGroup);

    res.json({ count, gps_groupname, gps_group_mastergroup_id });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", id)
      .query(queries.deleteGroup);

    if (result.rowsAffected[0] === 0) {
      return res.sendStatus(404);
    } else {
      return res.send("Group Deleted");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const createSubgroup = async (req, res) => {
  const { subgroup_name, subgroup_mastergroup_id } = req.body;

  // validating
  if (subgroup_name == null || subgroup_mastergroup_id === null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    let count = await pool.request().query(queries.getMaxSubgroupId);

    const subgroup_id = count.recordset[0].max_num + 1;

    const result = await pool
      .request()
      .input("subgroup_id", sql.Int, subgroup_id)
      .input("subgroup_name", sql.VarChar, subgroup_name)
      .input("subgroup_mastergroup_id", sql.Int, subgroup_mastergroup_id)
      .query(queries.addSubgroup);

    res.json({ subgroup_id, subgroup_name, subgroup_mastergroup_id });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const deleteSubgroup = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", id)
      .query(queries.deleteSubgroup);

    if (result.rowsAffected[0] === 0) {
      return res.sendStatus(404);
    } else {
      return res.send("Subgroup Deleted");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getAllGroups = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllGroups);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getAllSubGroups = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllSubGroups);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateGroup = async (req, res) => {
  const { group_id } = req.params;
  const { new_group_name } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("group_id", sql.Int, group_id)
      .input("new_group_name", sql.VarChar, new_group_name)
      .query(queries.updateGroup);

    return res.send("Group updated successfully")
  } catch (error) {
    res.status(500);
    res.send(error.message)
  }
};

export const updateSubGroup = async (req, res) => {
  const { subGroup_id } = req.params;
  const { new_subGroup_name } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("subGroup_id", sql.Int, subGroup_id)
      .input("new_subGroup_name", sql.VarChar, new_subGroup_name)
      .query(queries.updateSubGroup);

    return res.send("Sub-Group updated successfully")
  } catch (error) {
    res.status(500);
    res.send(error.message)
  }
};
/* ##################Chnage Role API##################  */
export const getAllRole = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.settingsAllRole);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getUserRole = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.settingsUserRole);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getAllStatus = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.settingsAllStatus);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateRoleAndStatus = async (req, res) => {
  const { user_id, role_id, status } = req.body;

  if (user_id == null) {
    return res
      .status(400)
      .json({ msg: "Bad Request. Please fill at least one field" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("user_id", sql.VarChar, user_id)
      .input("status", sql.VarChar, status)
      .input("role_id", sql.Int, role_id)
      .query(queries.updateRoleStatus);

    return res.send("User updated successfully!");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// export const updateUser = async (req, res) => {
//   const { user_id } = req.params;
//   const {
//     ad_user_name,
//     email_id,
//     group_id,
//     role_id,
//     subgroup_id,
//     name,
//     address,
//     p_number,
//     change_flag,
//     status,
//     photo,
//   } = req.body;

//   let { contact_number, room_no, punch_id, hostel, hostel_tower } = req.body;

//   // validating
//   if (
//     ad_user_name == null ||
//     email_id == null ||
//     contact_number == null ||
//     group_id == null ||
//     role_id == null ||
//     subgroup_id == null ||
//     name == null ||
//     room_no == null ||
//     address == null ||
//     p_number == null ||
//     punch_id == null ||
//     change_flag == null ||
//     hostel == null ||
//     hostel_tower == null ||
//     status == null ||
//     photo == null
//   ) {
//     return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
//   }

//   try {
//     const pool = await getConnection();
//     await pool
//       .request()
//       .input("ad_user_name", sql.VarChar, ad_user_name)
//       .input("email_id", sql.VarChar, email_id)
//       .input("contact_number", sql.VarChar, contact_number)
//       .input("group_id", sql.Int, group_id)
//       .input("role_id", sql.Int, role_id)
//       .input("subgroup_id", sql.Int, subgroup_id)
//       .input("name", sql.VarChar, name)
//       .input("room_no", sql.VarChar, room_no)
//       .input("address", sql.VarChar, address)
//       .input("p_number", sql.VarChar, p_number)
//       .input("punch_id", sql.Int, punch_id)
//       .input("change_flag", sql.BigInt, change_flag)
//       .input("hostel", sql.VarChar, hostel)
//       .input("hostel_tower", sql.VarChar, hostel_tower)
//       .input("status", sql.VarChar, status)
//       .input("photo", sql.VarChar, photo)
//       .input("user_id", sql.VarChar, user_id)
//       .query(queries.updateUser);

//     res.json({
//       id,
//       ad_user_name,
//       email_id,
//       contact_number,
//       group_id,
//       role_id,
//       subgroup_id,
//       name,
//       room_no,
//       address,
//       p_number,
//       punch_id,
//       change_flag,
//       hostel,
//       hostel_tower,
//       status,
//       photo,
//     });
//   } catch (error) {
//     res.status(500);
//     res.send(error.message);
//   }
// };

/* ##################Parameter Config API##################  */

export const getParameterConfig = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.settingsParameterConfig);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateWeekLimit = async (req, res) => {
  const { param_id } = req.params;
  const { value } = req.body;

  if (value == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("value", sql.Int, value)
      .input("param_id", sql.Int, param_id)
      .query(queries.updateParameterConfig);

    return res.send("Week Limit updated successfully!");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateOutTime = async (req, res) => {
  const { param_id } = req.params;
  const { value } = req.body;

  if (value == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("value", sql.VarChar, value)
      .input("param_id", sql.Int, param_id)
      .query(queries.updateParameterConfig);

    return res.send("Out Time updated successfully!");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateInTime = async (req, res) => {
  const { param_id } = req.params;
  const { value } = req.body;

  if (value == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("value", sql.VarChar, value)
      .input("param_id", sql.Int, param_id)
      .query(queries.updateParameterConfig);

    return res.send("In Time updated successfully!");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateArrivalRestrictUB = async (req, res) => {
  const { param_id } = req.params;
  const { value } = req.body;

  if (value == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("value", sql.VarChar, value)
      .input("param_id", sql.Int, param_id)
      .query(queries.updateParameterConfig);

    return res.send("Arrival Restrict UB updated successfully!");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateArrivalRestrictLB = async (req, res) => {
  const { param_id } = req.params;
  const { value } = req.body;

  if (value == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("value", sql.VarChar, value)
      .input("param_id", sql.Int, param_id)
      .query(queries.updateParameterConfig);

    return res.send("Arrival Restrict LB updated successfully!");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateFlexibleEntry = async (req, res) => {
  const { param_id } = req.params;
  const { value } = req.body;

  if (value == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("value", sql.Int, value)
      .input("param_id", sql.Int, param_id)
      .query(queries.updateParameterConfig);

    return res.send("Flexible Entry updated successfully!");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateStartDay = async (req, res) => {
  const { param_id } = req.params;
  const { value } = req.body;

  if (value == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
        .request()
        .input("value", sql.VarChar, value)
        .input("param_id", sql.Int, param_id)
        .query(queries.updateParameterConfig);

    return res.send("AutoApproval Start Day Successfully updated!");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateEndDay = async (req, res) => {
  const { param_id } = req.params;
  const { value } = req.body;

  if (value == null) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    await pool
        .request()
        .input("value", sql.VarChar, value)
        .input("param_id", sql.Int, param_id)
        .query(queries.updateParameterConfig);

    return res.send("AutoApproval End Day Successfully updated!");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

///////create user
export const createUser = async (req, res) => {
  const {
    user_id,
    email_id,
    group_id,
    role_id,
    subgroup_id,
    name,
    address,
    p_number,
    status,
  } = req.body;

  let { contact_number, room_no, punch_id, hostel, hostel_tower } = req.body;

  const ad_user_name = "";
  const change_flag = "";
  const photo = "";

  // validating
  if (
    user_id == null ||
    email_id == null ||
    group_id == null ||
    role_id == null ||
    subgroup_id == null ||
    name == null ||
    address == null ||
    p_number == null ||
    status == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  if (punch_id == null) punch_id = 0;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("user_id", sql.VarChar, user_id)
      .input("ad_user_name", sql.VarChar, ad_user_name)
      .input("email_id", sql.VarChar, email_id)
      .input("contact_number", sql.VarChar, contact_number)
      .input("group_id", sql.Int, group_id)
      .input("role_id", sql.Int, role_id)
      .input("subgroup_id", sql.Int, subgroup_id)
      .input("name", sql.VarChar, name)
      .input("room_no", sql.VarChar, room_no)
      .input("address", sql.VarChar, address)
      .input("p_number", sql.VarChar, p_number)
      .input("punch_id", sql.Int, punch_id)
      .input("change_flag", sql.BigInt, change_flag)
      .input("hostel", sql.VarChar, hostel)
      .input("hostel_tower", sql.VarChar, hostel_tower)
      .input("status", sql.VarChar, status)
      .input("photo", sql.VarChar, photo)
      .query(queries.addUser);

    res.json({
      user_id,
      ad_user_name,
      email_id,
      contact_number,
      group_id,
      role_id,
      subgroup_id,
      name,
      room_no,
      address,
      p_number,
      punch_id,
      change_flag,
      hostel,
      hostel_tower,
      status,
      photo,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/* __________________________________________________SETTINGS API__________________________________________________ */

export const getStudentTenureWise = async (req, res) => {
  try {
    const { id, sd, ed } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("user_id", id)
      .input("date_start", sd)
      .input("date_end", ed)
      .query(queries.reportStudentTenureWise);

    /* EXCEL JSON OBJECT TRAVERSING
        const excel = result.recordset;
        for(var x in excel){
            console.log(excel[x].from_date);
        } */

    return res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getStudentTenureWiseDownload = async (req, res) => {
  try {
    const { id, sd, ed } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("user_id", id)
      .input("date_start", sd)
      .input("date_end", ed)
      .query(queries.reportStudentTenureWise);

    const records = result.recordset;

    var wb = new xl.Workbook();
    var ws = wb.addWorksheet("student-tenure-wise");
    ws.cell(4, 1).string("S. No");
    ws.cell(4, 2).string("Request No.");
    ws.cell(4, 3).string("Gatepass Requested"); //convert gate type no to gatepass name
    ws.cell(4, 4).string("Departure Date"); //convert time into readable format
    ws.cell(4, 5).string("Departure Time");
    ws.cell(4, 6).string("Actual Departure Date");
    ws.cell(4, 7).string("Actual Departure Time");
    ws.cell(4, 8).string("Arrival Date");
    ws.cell(4, 9).string("Arrival Time");
    ws.cell(4, 10).string("Actual Arrival Date");
    ws.cell(4, 11).string("Actual Arrival Time");
    ws.cell(4, 12).string("Status");
    ws.cell(4, 13).string("Requested To");
    ws.cell(4, 14).string("Approved / Cancelled By");
    ws.cell(4, 15).string("Destination");
    ws.cell(4, 16).string("Purpose");
    ws.cell(4, 17).string("Applied Date");
    ws.cell(4, 18).string("Applied Time");
    ws.cell(4, 19).string("Check Out By");
    ws.cell(4, 20).string("Check In By");

    var i = 5;
    for (var x in records) {
      var temp = new Date(records[x].from_date);
      var from_date = String(
        temp.getDate() + "-" + temp.getMonth() + "-" + temp.getFullYear()
      );
      var temp = new Date(records[x].actual_out_date);
      var actual_out_date = String(
        temp.getDate() + "-" + temp.getMonth() + "-" + temp.getFullYear()
      );
      var temp = new Date(records[x].to_date);
      var to_date = String(
        temp.getDate() + "-" + temp.getMonth() + "-" + temp.getFullYear()
      );
      var temp = new Date(records[x].actual_in_date);
      var actual_in_date = String(
        temp.getDate() + "-" + temp.getMonth() + "-" + temp.getFullYear()
      );
      var temp = new Date(records[x].applied_date);
      var applied_date = String(
        temp.getDate() + "-" + temp.getMonth() + "-" + temp.getFullYear()
      );

      // if(dd == "0000-00-00"){
      //      departure_date = "";
      // }
      // else{
      //     departure_date = new Date(records[x].from_date);
      //     departure_date.getDate();
      // }
      // console.log(records[x].request_id+departure_date);

      ws.cell(i, 1).number(i - 4);
      ws.cell(i, 2).number(records[x].request_id);
      ws.cell(i, 3).number(records[x].gatepass_type); //convert gate type no to gatepass name
      ws.cell(i, 4).string(from_date); //convert time into readable format
      ws.cell(i, 5)
        .date(records[x].from_time)
        .style({ numberFormat: "hh:mm:ss" });
      ws.cell(i, 6).string(actual_out_date);
      ws.cell(i, 7)
        .date(records[x].actual_out_time)
        .style({ numberFormat: "hh:mm:ss" });
      ws.cell(i, 8).string(to_date);

      ws.cell(i, 9)
        .date(records[x].to_time)
        .style({ numberFormat: "hh:mm:ss" });
      ws.cell(i, 10).string(actual_in_date);
      ws.cell(i, 11)
        .date(records[x].actual_in_time)
        .style({ numberFormat: "hh:mm:ss" });
      ws.cell(i, 12).string(records[x].status);
      ws.cell(i, 13).string(records[x].send_approval_to);
      ws.cell(i, 14).string(records[x].approved_or_rejected_by);
      ws.cell(i, 15).string(records[x].destination);
      ws.cell(i, 16).string(records[x].purpose);
      ws.cell(i, 17).string(applied_date);
      ws.cell(i, 18)
        .date(records[x].applied_time)
        .style({ numberFormat: "hh:mm:ss" });
      ws.cell(i, 19).string(records[x].check_out_by);
      ws.cell(i, 20).string(records[x].check_in_by);
      i = i + 1;
    }
    const d = new Date();
    wb.write(
      "Datewise-" +
      d.getDate() +
      "-" +
      d.getMonth() +
      "-" +
      d.getFullYear() +
      "-" +
      d.getHours() +
      "-" +
      d.getMinutes() +
      ".xlsx",
      res
    );
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getStudentStatusWise = async (req, res) => {
  try {
    const { statuslist, sd, ed } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("statuslist", statuslist)
      .input("date_start", sd)
      .input("date_end", ed)
      .query(queries.reportStundentStatusWise);

    return res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getStudentStatusTenureWise = async (req, res) => {
  try {
    const { id, statuslist, sd, ed } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("user_id", id)
      .input("statuslist", statuslist)
      .input("date_start", sd)
      .input("date_end", ed)
      .query(queries.reportStundentStatusTenureWise);

    return res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getGatepassTypeWise = async (req, res) => {
  try {
    const { gpt, sd, ed } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("gpt", gpt)
      .input("date_start", sd)
      .input("date_end", ed)
      .query(queries.reportGatepassTypeWise);

    return res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getBlacklistedStudentDateWise = async (req, res) => {
  try {
    const { sd, ed } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("date_start", sd)
      .input("date_end", ed)
      .query(queries.reportBlacklistedStudentDateWise);

    return res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getBlacklistedGroupDateWise = async (req, res) => {
  try {
    const { sd, ed } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("date_start", sd)
      .input("date_end", ed)
      .query(queries.reportBlacklistedGroupDateWise);

    return res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getDefaulterDateWise = async (req, res) => {
  try {
    const { sd, ed } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("date_start", sd)
      .input("date_end", ed)
      .query(queries.reportDefaulterDateWise);

    return res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getEOD = async (req, res) => {
  try {
    const { date } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("date", date)
      .query(queries.reportEOD);
    return res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getWarden = async (req, res) => {
  try {
    const { id, sd, ed } = req.params;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("user_id", id)
      .input("date_start", sd)
      .input("date_end", ed)
      .query(queries.reportWarden);

    return res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/* __________________________________________________Blacklist API__________________________________________________ */

export const createBlacklistedStudent = async (req, res) => {
  const { user_id, from_date, from_time, to_date, to_time, remark } = req.body;

  const blacklisted_by = "JWT Required";
  const visibility = 1;

  // validating
  if (
    user_id == null ||
    from_date == null ||
    from_time == null ||
    to_date == null ||
    to_time == null ||
    remark == null
  ) {
    return res.status(400).json({ msg: "Bad Request. Please fill all fields" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("user_id", sql.VarChar, user_id)
      .input("from_date", sql.Date, from_date)
      .input("from_time", sql.Time, from_time)
      .input("to_date", sql.Date, to_date)
      .input("to_time", sql.Time, to_time)
      .input("blacklisted_by", sql.VarChar, blacklisted_by)
      .input("remark", sql.VarChar, remark)
      .input("visibility", sql.Int, visibility)
      .query(queries.addBlacklistedStudent);

    res.json({
      user_id,
      from_date,
      from_time,
      to_date,
      to_time,
      blacklisted_by,
      remark,
      visibility,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// ----------------------------------------All users api -------------------------

export const getAllUsers = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllusers);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateUser = async (req, res) => {
  const { user_id } = req.params;
  const {
    role_id,
    group_id,
    subgroup_id,
    hostel,
    room_no,
    contact_number,
    p_number,
  } = req.body;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("user_id", sql.VarChar, user_id)
      .input("role_id", sql.Int, role_id)
      .input("group_id", sql.Int, group_id)
      .input("subgroup_id", sql.Int, subgroup_id)
      .input("hostel", sql.VarChar, hostel)
      .input("room_no", sql.VarChar, room_no)
      .input("contact_number", sql.VarChar, contact_number)
      .input("p_number", sql.VarChar, p_number)
      .query(queries.updateUser);

    return res.send("User updated successfully!");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getUserDetails = async (req, res) => {
  const { user_id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("user_id", sql.VarChar, user_id)
      .query(queries.getUserById);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};