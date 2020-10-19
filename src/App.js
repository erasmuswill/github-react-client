import "./App.css";
import { Redirect, Router } from "@reach/router";
import ActivityLog from "./ActivityLog";
import { Grommet } from "grommet";

function App() {

  const DefaultRoute = () => (
    <Redirect to="/github-react-client/user/erasmuswill" />
  );

  return (
    <Grommet>
      Header with controls for input of ActivityLog variables
      <Router basepath="/github-react-client">
        <ActivityLog path="/:type/:resource/:query" />
        <ActivityLog path="/:type/:resource/" />
        <DefaultRoute default />
      </Router>
    </Grommet>
  );
}

export default App;
