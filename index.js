const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  res.status(200);
  res.send("Hello world - By: Michael Serrato");
});

app.listen(8035, () => {
  console.log("App running in port 8035");
});
