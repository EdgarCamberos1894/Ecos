import axios from "axios";

export const apiAxios = axios.create({
  baseURL: "https://ecos-ed30.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});
