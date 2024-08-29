import axios, { CreateAxiosDefaults } from "axios";

export const options: CreateAxiosDefaults = {
  baseURL: import.meta.env["VITE_BACKEND_URLBASE"],
  withCredentials: true,
}

export const Api = axios.create(options);
