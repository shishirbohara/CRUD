const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const studentRoutes = require("./routes/student");

app.use(express.json());

app.use("/", studentRoutes);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
