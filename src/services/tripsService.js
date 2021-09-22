import API from "./api";
import { TRIPS_URL } from "../config";

const getTrips = async () => {
  const response = await API.get(TRIPS_URL);
  return response.data;
};

export { getTrips };
