import API from "./api";
import { IMAGES_URL } from "../config";

const uploadImage = async (session, data) => {
  const { token } = session;
  const config = {
    headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${token}` 
    },
  };
  return API.post(IMAGES_URL, data, config);
}

export { uploadImage }