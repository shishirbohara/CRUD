const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "abc_school",
  password: "12345678",
  port: 5432,
});

client
  .connect()
  .then(() => console.log("Connected to 'abc_school' database successfully"))
  .catch((err) =>
    console.error("Error connecting to 'abc_school':", err.stack)
  );

module.exports = client;
