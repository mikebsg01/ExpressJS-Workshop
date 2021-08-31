const morgan = require('morgan');
const express = require("express");
const app = express();
const pokemon = require('./routes/pokemon');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  return res.status(200).send("Bienvenido al Pokedex!");
});

app.use('/pokemon', pokemon);

app.listen(process.env.PORT || 8035, () => {
  console.log("App running in port 8035");
});