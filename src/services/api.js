import { API_URL } from "../config";
import axios from "axios";

export default axios.create({
  baseURL: API_URL,
});