const getPokemon = async () => {
  try {
    const {
      data: { message },
    } = await axios.get(url("/pokemon"));
    return message;
  } catch (error) {
    const {
      response: { data },
    } = error;
    console.error(data);
    return [];
  }
};

const displayPokemon = (pokemon) => {
  const body = document.querySelector("#pokedex-list");

  for (let i = 0; i < pokemon.length; ++i) {
    body.innerHTML += `<h3>${pokemon[i].pok_name}</h3>`;
  }
};

const loadPokemon = async () => {
  const pokemon = await getPokemon();
  console.log({ pokemon });
  displayPokemon(pokemon);
};

const init = async () => {
  if (!checkIfUserIsLoggedIn()) {
    window.location.href = "index.html";
  }

  await loadPokemon();
};

window.onload = init;
