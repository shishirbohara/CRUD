const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const studentRoutes = require("./routes/student");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

app.use(express.json());

app.use("/", studentRoutes);
app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
