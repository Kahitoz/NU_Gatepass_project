import { jsonwebtoken } from "jsonwebtoken";
import { getConnection, sql, queries } from "../database";

export const authenticate = async (req, res, next) => {
  const access_token = req.headers.authorization;
  const jwt = require("jsonwebtoken");

  const pool = await getConnection();
  const result = await pool
    .request()
    .input("jwt", sql.VarChar, access_token)
    .query(queries.getBlacklistedJwt);
  const jwtCount = result.recordset[0]["TOTAL"];
  if (jwtCount === 0) {
    jwt.verify(access_token, "secret", function (err, decoded) {
      if (err) {
        res.json({ error: err });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.json({ ACCESS_DENIED: "JWT has expired" });
  }
};
