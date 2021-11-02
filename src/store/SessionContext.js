import { createContext } from "react";

const defaultSession = {
  isAuthenticated: false,
  isAgency: false,
  token: "",
  profileInfo: {},
};

const SessionContext = createContext(null);

export { defaultSession, SessionContext };
