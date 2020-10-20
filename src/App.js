import "./App.css";
import { Redirect, Router } from "@reach/router";
import ActivityLog from "./ActivityLog";
import { Grommet, Text, Box } from "grommet";

function App() {
  const DefaultRoute = () => (
    <Redirect to="/github-react-client/user/erasmuswill" />
  );

  return (
    <Grommet>
      <Box fill flex justify="center" align="center">
        <Box pad="medium" style={{ maxWidth: "800px" }}>
          <Text>Click items to save and unsave for later</Text>
        </Box>
      </Box>
      <Router basepath="/github-react-client">
        <ActivityLog path="/:type/:resource/" />
        <DefaultRoute default />
      </Router>
    </Grommet>
  );
}

export default App;
