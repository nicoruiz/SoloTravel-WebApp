import API from "./api";
import { AGENCIES_URL } from "../config";

const getAgencyTrips = async (session) => {
    const { userId, token } = session;
    const url = `${AGENCIES_URL}/${userId}/trips`;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const response = await API.get(url, config);
  
    return response.data;
};

const createTrip = async (session, createTripDto) => {
    const { userId, token } = session;
    const url = `${AGENCIES_URL}/${userId}/new`;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return API.post(url, createTripDto, config);
}
  
const updateTrip = async (session, tripId, updateTripDto) => {
    const { userId, token } = session;
    const url = `${AGENCIES_URL}/${userId}/edition/${tripId}`;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return API.put(url, updateTripDto, config);
}
  
const deleteTrip = async (session, tripId) => {
    const { userId, token } = session;
    const url = `${AGENCIES_URL}/${userId}/deletion/${tripId}`;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return API.delete(url, config);
};

  export { getAgencyTrips,  createTrip, updateTrip, deleteTrip };