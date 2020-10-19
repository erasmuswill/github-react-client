import { useState } from "react";
import "./App.css";
import { Router } from "@reach/router";
import ActivityLog from "./ActivityLog";

function App() {
  const [type, setType] = useState("");
  const [resource, setResource] = useState("");
  const [query, setQuery] = useState("");
  return (
    <div>
      Header with controls for input of ActivityLog variables
      <Router basepath="/github-react-client">
        <ActivityLog path="/:type/:resource/:query" />
        <ActivityLog path="/:type/:resource/" />
      </Router>
    </div>
  );
}

export default App;
