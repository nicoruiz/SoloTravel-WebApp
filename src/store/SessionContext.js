import { createContext } from "react";

const guestSession = {
  isAuthenticated: false,
  token: "",
  profileInfo: {},
};

const SessionContext = createContext(null);

export { guestSession, SessionContext };
