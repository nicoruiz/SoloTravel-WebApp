import API from "./api";
import { TRIPS_URL } from "../config";

const getTrips = async (userId, searchValue) => {
  const url = `${TRIPS_URL}/${userId}?name=${searchValue}`;
  const response = await API.get(url);
  return response.data;
};

export { getTrips };
