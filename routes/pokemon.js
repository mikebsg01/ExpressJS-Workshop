const express = require("express");
const pokemon = express.Router();
const db = require("../config/database");

pokemon.post("/", (req, res, next) => {
  return res.status(200).send(req.body);
});

pokemon.get("/", async (req, res, next) => {
  const pk = await db.query("SELECT * FROM pokemon");
  return res.status(200).send({
    code: 1,
    message: pk,
  });
});

pokemon.get("/:id([0-9]{1,3})", async (req, res, next) => {
  const id = req.params.id;

  if (id >= 1 && id <= 722) {
    const pk = await db.query(
      `SELECT * FROM pokemon WHERE pok_id = ${id} LIMIT 1`
    );
    return res.status(200).send({
      code: 1,
      message: pk[0],
    });
  }

  return res.status(404).send({
    code: 404,
    message: "Pokemon no encontrado :(",
  });
});

pokemon.get("/:name([A-Za-z]+)", async (req, res, next) => {
  const name = req.params.name;
  const pokemonFound = await db.query(
    `SELECT * FROM pokemon WHERE pok_name LIKE "${name}" LIMIT 1`
  );

  if (pokemonFound.length > 0) {
    return res.status(200).send({
      code: 1,
      message: pokemonFound[0],
    });
  }

  return res.status(404).send({
    code: 404,
    message: "Pokemon no encontrado :(",
  });
});

module.exports = pokemon;
