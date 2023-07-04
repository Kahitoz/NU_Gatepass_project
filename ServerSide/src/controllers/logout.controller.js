import { getConnection, sql, queries } from "../database";
export const insertLoggedOutJWT = async (req, res) => {
  const { accessToken } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("jwt", sql.VarChar, accessToken)
      .query(queries.insertLoggedOutJWT);
    return res.json({ message: "JWT added to Logged out list" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
