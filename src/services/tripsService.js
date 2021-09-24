import API from "./api";
import { TRIPS_URL } from "../config";

const getTrips = async (searchValue) => {
  const url = `${TRIPS_URL}?name=${searchValue}`;
  const response = await API.get(url);
  return response.data;
};

export { getTrips };
