import API from "./api";
import { AUTH_URL } from "../config";

const authenticateByGoogle = async (profileInfo, token) => {
  const url = `${AUTH_URL}/login/google`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  
  const response = await API.post(url, profileInfo, config);

  return response.data;
};

export { authenticateByGoogle };
