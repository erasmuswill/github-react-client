import React, { useState } from "react";
import "./App.css";
import { Router } from "@reach/router";
import ActivityLog from "./ActivityLog";

function App() {
  const [type, setType] = useState("");
  const [resource, setResource] = useState("");
  const [query, setQuery] = useState("");
  return (
    <div>
      <Router>
        <ActivityLog path="/:type/:resource/:query" />
        <ActivityLog path="/:type/:resource/" />
      </Router>
    </div>
  );
}

export default App;
