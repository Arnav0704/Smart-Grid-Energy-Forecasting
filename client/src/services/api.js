import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const signUp = (formData) => API.post("/signup", formData);
export const logIn = (formData) => API.post("/login", formData);
