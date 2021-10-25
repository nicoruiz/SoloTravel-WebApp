import React, { useMemo, useState } from "react";
import Layout from "./components/layout/Layout";
import { Switch, Route } from "react-router-dom";
import AllTrips from "./pages/AllTrips";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import { defaultSession, SessionContext } from "./store/SessionContext";
import AgencyLogin from "./pages/AgencyLogin";
import AgencyRegister from "./pages/AgencyRegister"
import AgencyTrips from "./pages/AgencyTrips";
import CreateTrip from "./pages/CreateTrip";
import EditTrip from "./pages/EditTrip";

function App() {
  
  const [session, setSession] = useState(defaultSession);

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
          <Route path="/agencyRegister">
            <AgencyRegister />
          </Route>
          <Route path="/agencyTrips">
            <AgencyTrips />
          </Route>
          <Route path="/createTrip">
            <CreateTrip />
          </Route>
          <Route path="/editTrip/:id">
            <EditTrip />
          </Route>
        </Switch>
      </Layout>
    </SessionContext.Provider>
  );
}

export default App;
