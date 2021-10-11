// Helpers
const baseURL = "http://localhost:8035";
const url = (path) => `${baseURL}${path}`;
const getToken = () => localStorage.getItem("token");

const checkIfUserIsLoggedIn = () => {
  const token = getToken();
  console.log({ token });

  return !!token && typeof token === "string";
};

// Global Axios Defaults (only for restricted pages)
axios.defaults.headers.common["Authorization"] = `Bearer ${getToken()}`;
