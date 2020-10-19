import "./App.css";
import { Redirect, Router } from "@reach/router";
import ActivityLog from "./ActivityLog";

function App() {
  return (
    <div>
      Header with controls for input of ActivityLog variables
      <Router basepath="/github-react-client">
        <ActivityLog path="/:type/:resource/:query" />
        <ActivityLog path="/:type/:resource/" />
        <Redirect to="/user/erasmuswill" default  />
      </Router>
    </div>
  );
}

export default App;
