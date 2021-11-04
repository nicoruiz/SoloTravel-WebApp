import API from "./api";
import { TRIPS_URL, TRAVELERS_URL, AGENCIES_URL } from "../config";
import { getTripsByUser } from "./TravelersService";

const getTrips = async (session, searchValue) => {
  return session.isAuthenticated
    ? getTripsByUser(session, searchValue)
    : getTripsAsGuest(searchValue);
};

const getTripsAsGuest = async (searchValue) => {
  const url = `${TRIPS_URL}?name=${searchValue}`;
  const response = await API.get(url);
  return response.data;
};

const getTripById = async (session, tripId) => {
  const { token } = session;
  const url = `${TRIPS_URL}/${tripId}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await API.get(url, config);
  
  return response.data;
};

export { getTrips, getTripById };
