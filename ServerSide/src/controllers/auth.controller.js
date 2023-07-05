import { getConnection, sql, queries } from "../database";
import jwt_decode from "jwt-decode";
import jwt_encode from "jwt-encode";
import jsonwebtoken from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

export const JWTgeneration = async (req, res) => {
  const client = new OAuth2Client(
    "372946592599-u1gj83quodhpdae46ejslj4tto3mn3vn.apps.googleusercontent.com"
  );
  const { googleJWT } = req.body;

  const verify = async () => {
    const ticket = await client.verifyIdToken({
      idToken: googleJWT,
      audience:
        "372946592599-u1gj83quodhpdae46ejslj4tto3mn3vn.apps.googleusercontent.com",
    });
    const payload = ticket.getPayload();
  };
  verify().catch(console.error);

  const userObject = jwt_decode(googleJWT);
  const email_id = userObject.email;
  const pool = await getConnection();
  const result = await pool
    .request()
    .input("email_id", sql.VarChar, email_id)
    .query(queries.getUserInformation);
  const rowAffected = result.rowsAffected[0];
  if (rowAffected === 0) {
    res.status(403).json({ err: "NOT ALLOWED" });
  } else {
    const userInfo = result.recordset[0];
    // const sign = require("jwt-encode");
    const SERVER_SECRET = "secret";
    // const JWT = sign(userInfo, SERVER_SECRET);
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
      {
        // Assigning data value
        data: userInfo,
      },
      SERVER_SECRET,
      {
        expiresIn: "60m",
      }
    );
    res.json({ ACCESS_TOKEN: token });
  }
};
