import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: {
    minVersion: 'TLSv1.2',
    rejectUnauthorized: true
  },
  connectionLimit: 10,
  connectTimeout: 30000,
});

export default connection;
