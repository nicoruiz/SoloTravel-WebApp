import API from "./api";

const registerTravelAgency = async (session, TravelAgencyRegisterDto) => {
    
    const url = `/register/travelAgency`;

    return API.post(url, TravelAgencyRegisterDto);
  }

  export { registerTravelAgency };