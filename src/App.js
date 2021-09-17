import Layout from "./components/layout/Layout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AllTrips from "./pages/AllTrips";
import Favorites from "./pages/Favorites";

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
      </Switch>
    </Layout>
  );
}

export default App;
