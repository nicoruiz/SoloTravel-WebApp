import API from "./api";
import { AUTH_URL } from "../config";

const authenticateByGoogle = async (token) => {
  const url = `${AUTH_URL}/login/google`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  
  const response = await API.post(url, null, config);

  return response.data;
};

const authenticateByAgency = async (email, password) => {
  const url = `${AUTH_URL}/login/internal`;
  const body = {
      email: email,
      password: password
    };

  const response = await API.post(url, body);
  return response;
}

export { authenticateByGoogle, authenticateByAgency };