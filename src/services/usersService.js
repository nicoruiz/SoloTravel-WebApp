import API from "./api";
import { USERS_URL } from "../config";

const getFavorites = async (userId) => {
  const url = `${USERS_URL}/${userId}/favorites`;
  const response = await API.get(url);

  return response.data;
};

const addFavorite = async (userId, tripId) => {
  const url = `${USERS_URL}/${userId}/favorites/${tripId}`;
  const response = await API.put(url);

  return response.data;
};

const removeFavorite = async (userId, tripId) => {
  const url = `${USERS_URL}/${userId}/favorites/${tripId}`;
  const response = await API.delete(url);

  return response.data;
};

export { getFavorites, addFavorite, removeFavorite };
