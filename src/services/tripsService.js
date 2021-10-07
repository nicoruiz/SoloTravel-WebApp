import API from "./api";
import { TRIPS_URL } from "../config";

const getTrips = async (session, searchValue) => {
  return session.isAuthenticated
    ? getTripsByUser(session.userId, searchValue)
    : getTripsAsGuest(searchValue);
};

const getTripsByUser = async (userId, searchValue) => {
  const url = `${TRIPS_URL}/${userId}?name=${searchValue}`;
  const response = await API.get(url);
  return response.data;
};

const getTripsAsGuest = async (searchValue) => {
  const url = `${TRIPS_URL}?name=${searchValue}`;
  const response = await API.get(url);
  return response.data;
};

export { getTrips };
