import axios from "axios";
import { server } from "./server";

const instance = axios.create({
  baseURL: server,
});

export default instance;
