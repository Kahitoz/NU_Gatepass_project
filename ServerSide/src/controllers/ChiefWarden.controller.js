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

  export const getHostelTowers = async (req, res) => {
    try {
      const{hostel}=req.params;
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("hostel", sql.VarChar, hostel)
        .query(queries.getHostelTowers);
      return res.json(result.recordset);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  export const getAllWardens = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .query(queries.getAllWardens);
      return res.json(result.recordset);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  export const getAllottedTowersReport = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .query(queries.getAllottedTowersReport);
      return res.json(result.recordset);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  export const getAllGatePassesToday = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .query(queries.getAllGatepassesToday);
      return res.json(result.recordset);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  export const wardenGatepassDetails=async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
          .request()
          .query(queries.getWardenGatepassDetails);
        return res.json(result.recordset);
      } catch (error) {
        res.status(500).send(error.message);
      }

  }
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

  export const insertTowerWarden=async (req, res) => {
    try{
        const pool = await getConnection();
        const result= await pool
        .request()
        .input('hostel_name',sql.VarChar,req.body.hostel_name)
        .input('hostel_id',sql.Int,req.body.hostel_id)
        .input('warden_id',sql.VarChar,req.body.warden_id)
        .input('warden_name',sql.VarChar,req.body.warden_name)
        .query(queries.insertTowerWarden)
        return res.send(result.recordset)
    }
    catch(error){
        res.status(500);
        console.log(error.message);
        res.send(error.message);
    }
  }