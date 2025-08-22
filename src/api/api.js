import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // URL backend Laravel
});

// contoh request POST (misal login)
export const login = async (ucp, password) => {
  const response = await api.post("/login", { ucp, password });
  return response.data;
};
