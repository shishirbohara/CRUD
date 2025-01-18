const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const studentRoutes = require("./routes/student");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/", studentRoutes);
app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
