const SESSION_KEY = "session";

const setSessionInLocalStorage = (session) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

const removeSessionFromLocalStorage = () => {
    localStorage.removeItem(SESSION_KEY);
}

const getSessionFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
}

export { getSessionFromLocalStorage, setSessionInLocalStorage, removeSessionFromLocalStorage }