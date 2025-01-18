const express = require("express");
const client = require("../db");
const router = express.Router();

router.get("/student", (req, res) => {
  const query = `SELECT * FROM students`;

  client.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Failed to get all the students" });
    }
    res.status(200).json({ students: result.rows });
  });
});

router.post("/student", (req, res) => {
  const { full_name, grade, section, roll_no } = req.body;

  const query = `
    INSERT INTO students (full_name, grade, section, roll_no)
    VALUES ($1, $2, $3, $4) RETURNING *;
  `;
  const values = [full_name, grade, section, roll_no];

  client.query(query, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error inserting student" });
    }
    res.status(201).json({ student: result.rows[0] });
  });
});

router.delete("/student/:id", (req, res) => {
  const studentId = req.params.id;

  const query = `DELETE FROM students WHERE id = $1 RETURNING *`;
  const values = [studentId];
  client.query(query, values, (err, result) => {
    if (err) {
      res.status(501).json({ error: "Error deleting student" });
    }
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "student not found" });
    }
    res.status(201).json({
      message: "Student deleted successfully",
      student: result.rows[0],
    });
  });
});

router.put("/student/:id", (req, res) => {
  const studentId = req.params.id;
  const { full_name, grade, section, roll_no } = req.body;

  const query = `UPDATE students
  SET full_name= $1, grade= $2, section= $3, roll_no= $4
  WHERE id = $5
  RETURNING *`;
  const values = [full_name, grade, section, roll_no, studentId];

  client.query(query, values, (err, result) => {
    if (err) {
      res.status(501).json({ error: "Error updating student" });
    }
    if (!result || result.rowCount === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res
      .status(201)
      .json({ message: "Student update sucess", student: result.rows[0] });
  });
});

module.exports = router;
