import { getConnection, sql, queries } from "../database";
const date = require("date-and-time");

  export const blacklistedStudentWise = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .query(queries.getBlacklistedStudentWise);
      return res.json(result.recordset);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  export const blacklistedGroupWise=async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
          .request()
          .query(queries.getBlacklistedGroupWise);
        return res.json(result.recordset);
      } catch (error) {
        res.status(500).send(error.message);
      }

  }
  export const AutoApprovedAll=async (req, res) => {
    try{
        const pool = await getConnection();
        const result= await pool
        .request()
        .query(queries.getAutoApprovedAll)
        return res.send(result.recordset)
    }
    catch(error){
        res.status(500);
        res.send(error.message);
    }
  }