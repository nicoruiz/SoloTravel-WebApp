import React, { useMemo, useState } from "react";
import Layout from "./components/layout/Layout";
import { Switch, Route } from "react-router-dom";
import AllTrips from "./pages/AllTrips";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import { currentSession, SessionContext } from "./store/SessionContext";
import AgencyLogin from "./pages/AgencyLogin";
import AgencyRegister from "./pages/AgencyRegister"
import AgencyTrips from "./pages/AgencyTrips";
import CreateTrip from "./pages/CreateTrip";
import EditTrip from "./pages/EditTrip";
import TripDetails from "./pages/TripDetails";

function App() {

  const [session, setSession] = useState(currentSession);
  const sessionProviderValue = useMemo(() => ({ session, setSession }), [session, setSession]);

  return (
    <SessionContext.Provider value={sessionProviderValue}>
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
          <Route path="/tripDetails/:id">
            <TripDetails />
          </Route>
        </Switch>
      </Layout>
    </SessionContext.Provider>
  );
}

export default App;
