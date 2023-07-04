import sql from "mssql";
import config from "../dbConfig";

const dbSettings = {
  user: config.dbUser,
  password: config.dbPassword,
  server: config.dbServer,
  database: config.dbDatabase,
  driver: "msnodesqlv8",
  options: {
    port: config.dbPort, // default port: 1433
    encrypt: false, // for azure
    trustServerCertificate: true,
  },
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
};

export { sql };
