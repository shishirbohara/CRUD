const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const client = require("../db");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const checkUserQuery = `SELECT * FROM users WHERE email = $1`;
    const values = [email];
    const result = await client.query(checkUserQuery, values);

    if (result.rowCount > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (username, email, password) 
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const userValues = [username, email, hashedPassword];
    const userResult = await client.query(query, userValues);

    const user = userResult.rows[0];

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token: token,
      user: user,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const userQuery = `SELECT * FROM users WHERE email = $1`;
    const values = [email];
    const result = await client.query(userQuery, values);

    if (result.rowCount === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: user,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
