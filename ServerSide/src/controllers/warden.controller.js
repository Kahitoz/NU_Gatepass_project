import { getConnection, sql, queries } from "../database";
const date = require("date-and-time");

export const gatepassApproveOrReject = async (req, res) => {
  try {
    const { id, flag } = req.params;
    const pool = await getConnection();
    if (flag == 0) {
      const result = await pool
        .request()
        .input("id", sql.Int, id)
        .query(queries.acceptGatepass);
      return res.send("Gatepass Approved!");
    } else if (flag == 1) {
      const result = await pool
        .request()
        .input("id", sql.Int, id)
        .query(queries.rejectGatepass);
      return res.send("Gatepass Rejected!");
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const approveGatepass = async (req, res) => {
  const currentDate = new Date();
  let approved_or_rejected_date =
    currentDate.getFullYear() +
    "-" +
    String(currentDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(currentDate.getDate()).padStart(2, "0");
  let approved_or_rejected_time =
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();
  const approved_or_rejected_by = req.user.data.user_id;
  const { request_id, comments } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("approved_or_rejected_by", sql.VarChar, approved_or_rejected_by)
      .input(
        "approved_or_rejected_date",
        sql.VarChar,
        approved_or_rejected_date
      )
      .input(
        "approved_or_rejected_time",
        sql.VarChar,
        approved_or_rejected_time
      )
      .input("comments", sql.VarChar, comments)
      .input("request_id", sql.Int, request_id)
      .query(queries.approveGatepass);
    return res.send("Gatepass Approved!");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const rejectGatepass = async (req, res) => {
  try {
    const currentDate = new Date();
    let approved_or_rejected_date =
      currentDate.getFullYear() +
      "-" +
      String(currentDate.getMonth()+1).padStart(2, "0") +
      "-" +
      String(currentDate.getDate()).padStart(2, "0");

    let approved_or_rejected_time =
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes() +
      ":" +
      currentDate.getSeconds();
    const id = req.user.data.user_id;
    const { request_id, comments } = req.body;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("user_id", sql.VarChar, id)
      .input("request_id", sql.Int, request_id)
      .input("comments", sql.VarChar, comments)
      .input("date", sql.VarChar, approved_or_rejected_date)
      .input("time", sql.Time, approved_or_rejected_time)
      .query(queries.rejectGatepass);
    return res.send("Gatepass rejected!");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getAllGatepasses = async (req, res) => {
  const approved_or_rejected_by = req.user.data.user_id;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("approved_or_rejected_by", sql.VarChar, approved_or_rejected_by)
      .query(queries.getAllGatepasses);

    return res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getDashboardMy = async (req, res) => {
  try {
    const user_id = req.user.data.user_id;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("approval_to", sql.VarChar, user_id)
      .query(queries.getPendingGatepass);
    return res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

}

export const getCurrentAutoApprovedBatches = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getCurrentAutoApprovedBatches);
    return res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getDashboardOthers = async(req,res) =>{
  try{
    const approval_to = req.user.data.user_id;
    const pool = await getConnection();
    const result= await pool
    .request()
    .input("approval_to",sql.VarChar,approval_to)
    .query(queries.getDashboardOthers)

    return res.send(result.recordset)
  }catch(error){
    res.status(500)
    res.send(error.message)
  }
}
