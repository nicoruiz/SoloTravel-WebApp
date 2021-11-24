import API from "./api";
import { TRIPS_URL } from "../config";
import { getTripsByUser } from "./travelersService";

const getTrips = async (session, searchValue, searchDate) => {
  return session.isAuthenticated
    ? getTripsByUser(session, searchValue, searchDate)
    : getTripsAsGuest(searchValue, searchDate);
};

const getTripsAsGuest = async (searchValue, searchDate) => {
  const url = `${TRIPS_URL}?destination=${searchValue}&date=${searchDate}`;
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

const getTripDetails = async (tripId) => {
  const url = `${TRIPS_URL}/${tripId}/details`;
  const response = await API.get(url);
  return response.data;
};

export { getTrips, getTripById, getTripDetails };
