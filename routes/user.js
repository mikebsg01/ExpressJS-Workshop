const express = require("express");
const user = express.Router();
const db = require("../config/database");

user.post("/", async (req, res, next) => {
  const { user_name, user_mail, user_password } = req.body;

  if (user_name && user_mail && user_password) {
    let query = `
        INSERT INTO user(user_name, user_mail, user_password)
        VALUES('${user_name}', '${user_mail}', '${user_password}');
      `;

    const result = await db.query(query);

    if (result.affectedRows === 1) {
      return res
        .status(201)
        .json({ code: 201, message: "Usuario insertado correctamente" });
    }

    return res.status(500).json({ code: 500, message: "Ocurrió un error" });
  }

  return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

user.get("/", async (req, res, next) => {
  const users = await db.query("SELECT * FROM user");
  return res.status(200).json({
    code: 200,
    message: users,
  });
});

module.exports = user;
