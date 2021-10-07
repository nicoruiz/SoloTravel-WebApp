import React, { useMemo, useState } from "react";
import Layout from "./components/layout/Layout";
import { Switch, Route } from "react-router-dom";
import AllTrips from "./pages/AllTrips";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import { guestSession, SessionContext } from "./store/SessionContext";
import AgencyLogin from "./pages/AgencyLogin";

function App() {
  
  const [session, setSession] = useState(guestSession);

  const value = useMemo(() => ({session, setSession}), [session, setSession]);
  
  return (
    <SessionContext.Provider value={value}>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <AllTrips />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/agencyLogin">
            <AgencyLogin />
          </Route>
        </Switch>
      </Layout>
    </SessionContext.Provider>
  );
}

export default App;
