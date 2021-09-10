const express = require("express");
const pokemon = express.Router();
const db = require("../config/database");

pokemon.post("/", async (req, res, next) => {
  const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

  if (pok_name && pok_height && pok_weight && pok_base_experience) {
    let query = `
      INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)
      VALUES('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience});
    `;

    const result = await db.query(query);

    if (result.affectedRows === 1) {
      return res
        .status(201)
        .json({ code: 201, message: "Pokemon insertado correctamente" });
    }

    return res.status(500).json({ code: 500, message: "Ocurrió un error" });
  }

  return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

pokemon.delete("/:id([0-9]{1,3})", async (req, res, next) => {
  const id = req.params.id;
  const query = `DELETE FROM pokemon WHERE pok_id=${id}`;
  const result = await db.query(query);

  if (result.affectedRows == 1) {
    return res.status(200).json({
      code: 200,
      message: "Pokemon eliminado correctamente",
    });
  }

  return res.status(404).json({
    code: 404,
    message: "Pokemon no encontrado",
  });
});

pokemon.put("/:id([0-9]{1,3})", async (req, res, next) => {
  const id = req.params.id;
  const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

  if (pok_name && pok_height && pok_weight && pok_base_experience) {
    const query = `
      UPDATE pokemon
      SET pok_name = '${pok_name}', 
        pok_height = ${pok_height}, 
        pok_weight = ${pok_weight}, 
        pok_base_experience = ${pok_base_experience}
      WHERE pok_id = ${id}
    `;

    const result = await db.query(query);

    if (result.affectedRows === 1) {
      return res
        .status(201)
        .json({ code: 201, message: "Pokemon actualizado correctamente" });
    }

    return res.status(500).json({ code: 500, message: "Ocurrió un error" });
  }

  return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

pokemon.patch("/:id([0-9]{1,3})", async (req, res, next) => {
  const id = req.params.id;
  const { pok_name } = req.body;

  if (pok_name) {
    const query = `
        UPDATE pokemon
        SET pok_name = '${pok_name}'
        WHERE pok_id = ${id}
      `;

    const result = await db.query(query);

    if (result.affectedRows === 1) {
      return res
        .status(201)
        .json({ code: 201, message: "Pokemon actualizado correctamente" });
    }

    return res.status(500).json({ code: 500, message: "Ocurrió un error" });
  }

  return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

pokemon.get("/", async (req, res, next) => {
  const pk = await db.query("SELECT * FROM pokemon");
  return res.status(200).json({
    code: 200,
    message: pk,
  });
});

pokemon.get("/:id([0-9]{1,3})", async (req, res, next) => {
  const id = req.params.id;

  if (id >= 1 && id <= 722) {
    const pk = await db.query(
      `SELECT * FROM pokemon WHERE pok_id = ${id} LIMIT 1`
    );
    return res.status(200).json({
      code: 200,
      message: pk[0],
    });
  }

  return res.status(404).json({
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
    return res.status(200).json({
      code: 200,
      message: pokemonFound[0],
    });
  }

  return res.status(404).json({
    code: 404,
    message: "Pokemon no encontrado :(",
  });
});

module.exports = pokemon;
