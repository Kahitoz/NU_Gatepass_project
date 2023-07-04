import { getConnection, sql, queries } from "../database";
const date = require("date-and-time");
const xl = require("excel4node");

export const getAllApproved = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getApprovedStudents);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getAllCheckedOut = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getCheckedOutStudents);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const studentCheckin = async (req, res) => {
  const { check_in_by, user_id, request_id } = req.body;
  const currentDate = new Date();
  let actual_in_date =
    currentDate.getFullYear() +
    "-" +
    String(currentDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    currentDate.getDate() +
    " " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();
  let actual_in_time =
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();

  if (check_in_by == null || request_id == null || user_id == null) {
    return res.status(400).json({ msg: "Bad Request" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("user_id", sql.VarChar, user_id)
      .input("request_id", sql.Int, request_id)
      .input("check_in_by", sql.VarChar, check_in_by)
      .input("actual_in_date", sql.VarChar, actual_in_date)
      .input("actual_in_time", sql.VarChar, actual_in_time)
      .query(queries.studentCheckin);

    return res.send("Student in now Checkedin");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateUserStatusCheckin = async (req, res) => {
  const { user_id } = req.body;
  if (user_id == null) {
    return res.status(400).json({ msg: "Bad request" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("user_id", sql.VarChar, user_id)
      .query(queries.updateUserStatusCheckin);
    return res.send("Status updated in the Usermaster table");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const studentCheckout = async (req, res) => {
  const { check_out_by, user_id, request_id } = req.body;
  const currentDate = new Date();
  let actual_out_date =
    currentDate.getFullYear() +
    "-" +
    String(currentDate.getMonth() + 1).padStart(2, "0") +
    "-" +
    currentDate.getDate() +
    " " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();
  let actual_out_time =
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();

  if (check_out_by == null || request_id == null || user_id == null) {
    return res.status(400).json({ msg: "Bad Request" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("user_id", sql.VarChar, user_id)
      .input("request_id", sql.Int, request_id)
      .input("check_out_by", sql.VarChar, check_out_by)
      .input("actual_out_date", sql.VarChar, actual_out_date)
      .input("actual_out_time", sql.VarChar, actual_out_time)
      .query(queries.studentCheckout);

    return res.send("Student is now Checkedout");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateUserStatusCheckout = async (req, res) => {
  const { user_id } = req.body;
  if (user_id == null) {
    return res.status(400).json({ msg: "Bad request" });
  }

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("user_id", sql.VarChar, user_id)
      .query(queries.updateUserStatusCheckout);
    return res.send("Status updated in the Usermaster table");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const updateDefaulterFlag = async (req, res) => {
  const { check_out_by, user_id, request_id } = req.body;
  if (request_id == null || user_id == null) {
    return res.status(400).json({ msg: "Bad Request" });
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("user_id", sql.VarChar, user_id)
      .input("request_id", sql.Int, request_id)
      .query(queries.updateDefaulterFlag);
    return res.send("defaulter flag updated");
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

/* __________________________________________________DASHBOARD API__________________________________________________ */
export const getApprovedToday = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.dashboardApprovedToday);
    return res.json(result.recordset[0]["TOTAL"]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getStudentsReturning = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .query(queries.dashboardStudentsReturning);
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
