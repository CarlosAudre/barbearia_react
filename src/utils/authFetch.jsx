export async function authFetch(endpoint, options = {}) {
  //API URL----------------------------------------------------------------------------------------------------------------------------------
  const url = "http://localhost:8081";
  const token = localStorage.getItem("token");
   if (!token) {
    throw new Error("Usuário não autenticado");
  }

  return fetch(`${url}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
