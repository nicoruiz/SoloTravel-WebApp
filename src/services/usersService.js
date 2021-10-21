import API from "./api";
import { USERS_URL } from "../config";

const getFavorites = async (session) => {
  const { userId, token } = session;
  const url = `${USERS_URL}/${userId}/favorites`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await API.get(url, config);

  return response.data;
};

const addFavorite = async (session, tripId) => {
  const { userId, token } = session;
  const url = `${USERS_URL}/${userId}/favorites/${tripId}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await API.put(url, null, config);

  return response.data;
};

const removeFavorite = async (session, tripId) => {
  const { userId, token } = session;
  const url = `${USERS_URL}/${userId}/favorites/${tripId}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await API.delete(url, config);

  return response.data;
};

const getAgencyTrips = async (session) => {
  const { userId, token } = session;
  const url = `${USERS_URL}/${userId}/trips`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await API.get(url, config);

  return response.data;
};

export { getFavorites, addFavorite, removeFavorite, getAgencyTrips };
