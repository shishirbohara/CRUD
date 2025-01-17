const express = require("express");
const client = require("./db");
const router = express.Router();

router.post("/student", (req, res) => {
  const { full_name, grade, section, roll_no } = req.body;

  const query = `INSERT INTO students(full_name, grade, section,roll_no)
    VALUES ($1, $2, $3, $4) RETURNING *`;

  const values = [full_name, grade, section, roll_no];
  client.query(query, values, (err, result) => {
    if (err) {
      console.error("Error", err.stack);
      res.status(500).json({ error: "Error creating student" });
    }
    res.status(201).json({ student: result.rows[0] });
  });
});
