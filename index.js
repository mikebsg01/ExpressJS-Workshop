// Dependencies
const express = require("express");
const app = express();

// Routes
const pokemon = require("./routes/pokemon");
const user = require("./routes/user");

// Middleware
const cors = require("./middleware/cors");
const auth = require("./middleware/auth");
const notFound = require("./middleware/notFound");

app.use(cors);

if (process.env.NODE_ENV === "development") {
  const morgan = require("morgan");

  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  return res.status(200).send({
    code: 1,
    message: "Bienvenido al Pokedex",
  });
});

app.use("/user", user);

app.use(auth);

app.use("/pokemon", pokemon);

app.use(notFound);

app.listen(process.env.PORT || 8035, () => {
  console.log("App running in port 8035");
});
