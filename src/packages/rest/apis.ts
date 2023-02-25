import axios from "axios";
import { API_URI } from "../env/constants";

const myAxios = axios.create({
  baseURL: API_URI,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export const RestApis = myAxios;
