const init = () => {
  if (checkIfUserIsLoggedIn()) {
    window.location.href = "pokedex.html";
  }

  document.querySelector("#btn-submit").addEventListener("click", signin);
};

const signin = async () => {
  const user_mail = document.getElementById("input-mail").value;
  const user_name = document.getElementById("input-name").value;
  const user_password = document.getElementById("input-password").value;

  if (user_mail && user_name && user_password) {
    try {
      const { data } = await axios.post("http://localhost:8035/user/signin", {
        user_mail,
        user_name,
        user_password,
      });

      console.log(data);
      alert("Registro exitoso! :)");
      window.location.href = "login.html";
    } catch (error) {
      const {
        response: { data },
      } = error;
      console.error(data);
    }
  } else {
    alert("Campos incompletos! Por favor, llena los campos faltantes.");
  }
};

window.onload = init;
