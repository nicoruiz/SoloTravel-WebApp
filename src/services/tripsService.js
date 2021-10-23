import API from "./api";
import { TRIPS_URL } from "../config";

const getTrips = async (session, searchValue) => {
  return session.isAuthenticated
    ? getTripsByUser(session, searchValue)
    : getTripsAsGuest(searchValue);
};

const createTrip = async (session, createTripDto) => {
  const { userId, token } = session;
  const url = `${TRIPS_URL}/${userId}/new`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return API.post(url, createTripDto, config);
}

const getTripsByUser = async (session, searchValue) => {
  const { userId, token } = session;
  const url = `${TRIPS_URL}/${userId}?name=${searchValue}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await API.get(url, config);
  
  return response.data;
};

const getTripsAsGuest = async (searchValue) => {
  const url = `${TRIPS_URL}?name=${searchValue}`;
  const response = await API.get(url);
  return response.data;
};

export { getTrips, createTrip };
