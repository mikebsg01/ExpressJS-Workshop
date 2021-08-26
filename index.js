const express = require("express");
const app = express();
const { pokemon } = require("./pokedex.json");

app.get("/", (req, res, next) => {
  return res.status(200).send("Bienvenido al Pokedex!");
});

app.get("/pokemon/all", (req, res, next) => {
  return res.status(200).send(pokemon);
});

app.get("/pokemon/:id([0-9]{1,3})", (req, res, next) => {
  const id = req.params.id - 1;

  if (id >= 0 && id <= 150) {
    return res.status(200).send(pokemon[id]);
  }
  
  return res.status(404).send("Pokemon no encontrado :(");
});

app.get("/pokemon/:name([A-Za-z]+)", (req, res, next) => {
  const name = req.params.name;
  const pokemonFound = pokemon.find(
    (e) => e.name.toUpperCase() == name.toUpperCase()
  );

  if (pokemonFound) {
    return res.status(200).send(pokemonFound);
  }

  return res.status(404).send("Pokemon no encontrado :(");
});

app.listen(process.env.PORT || 8035, () => {
  console.log("App running in port 8035");
});
