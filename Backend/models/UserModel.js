const db = require("../config/db");
const bcrypt = require("bcrypt");

const createUser = async (name, email, password) => {
  const hash = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hash],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
};

const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) reject(err);
      else resolve(results[0]);
    });
  });
};

module.exports = { createUser, findUserByEmail };
