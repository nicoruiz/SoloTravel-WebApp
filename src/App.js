import Layout from "./components/layout/Layout";
import { Switch, Route } from "react-router-dom";
import AllTrips from "./pages/AllTrips";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";

function App() {
  return (
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
      </Switch>
    </Layout>
  );
}

export default App;
