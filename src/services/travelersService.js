import API from "./api";
import { TRAVELERS_URL } from "../config";

const getFavorites = async (session) => {
  const { userId, token } = session;
  const url = `${TRAVELERS_URL}/${userId}/favorites`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await API.get(url, config);

  return response.data;
};

const addFavorite = async (session, tripId) => {
  const { userId, token } = session;
  const url = `${TRAVELERS_URL}/${userId}/favorites/${tripId}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await API.put(url, null, config);

  return response.data;
};

const removeFavorite = async (session, tripId) => {
  const { userId, token } = session;
  const url = `${TRAVELERS_URL}/${userId}/favorites/${tripId}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await API.delete(url, config);

  return response.data;
};

const getTripsByUser = async (session, searchValue, searchDate) => {
  const { userId, token } = session;
  const url = `${TRAVELERS_URL}/${userId}?destination=${searchValue}&date=${searchDate}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await API.get(url, config);
  
  return response.data;
};

const bookTrip = async (session, tripId) => {
  const { userId, token } = session;
  const url = `${TRAVELERS_URL}/${userId}/book/${tripId}`
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const response = await API.put(url, config);
  console.log(response.data)
}

export { getFavorites, addFavorite, removeFavorite, getTripsByUser, bookTrip };
