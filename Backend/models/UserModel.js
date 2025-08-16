import db from "../config/db.js";
import bcrypt from "bcrypt";

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM userss WHERE email = ?", [email], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });
};

const createUser = async (name, email, password) => {
  const hash = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO userss (name, email, password) VALUES (?, ?, ?)",
      [name, email, hash],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
};

export { createUser, findUserByEmail };
