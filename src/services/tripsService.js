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

const updateTrip = async (session, tripId, updateTripDto) => {
  const { userId, token } = session;
  const url = `${TRIPS_URL}/${userId}/edition/${tripId}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return API.put(url, updateTripDto, config);
}

const deleteTrip = async (session, tripId) => {
  const { userId, token } = session;
  const url = `${TRIPS_URL}/${userId}/deletion/${tripId}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return API.delete(url, config);
}

const getTripsByUser = async (session, searchValue) => {
  const { userId, token } = session;
  const url = `${TRIPS_URL}/user/${userId}?name=${searchValue}`;
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

const getTripById = async (session, tripId) => {
  const { token } = session;
  const url = `${TRIPS_URL}/${tripId}`;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await API.get(url, config);
  
  return response.data;
};

export { getTrips, createTrip, updateTrip, deleteTrip, getTripById };
