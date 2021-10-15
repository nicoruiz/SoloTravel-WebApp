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
  const config = {
    body: {
      email: 'guestTravelAgent@gmail.com',
      password: 'guest'
    }
  };

  const response = await API.post(url, config);

  return response.data;
  //console.log("hello from auth agency", {email: email, password: password});
}

export { authenticateByGoogle, authenticateByAgency };
