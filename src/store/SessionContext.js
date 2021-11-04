import { createContext } from "react";
import * as sessionService from "../services/sessionService";

const localStorageSession = sessionService.getSessionFromLocalStorage();

const defaultSession = {
  isAuthenticated: false,
  isAgency: false,
  token: "",
  profileInfo: {},
};

const currentSession = localStorageSession === null 
  ? defaultSession
  : localStorageSession;

const SessionContext = createContext(null);

export { defaultSession, currentSession, SessionContext };
