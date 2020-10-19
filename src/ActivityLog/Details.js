import { compose, withMemo } from "@truefit/bach";
import ActivityItem from "./ActivityItem";

const { Box, List } = require("grommet");

const Details = compose(
  withMemo("processedData", ({ data }) => [...data], ["data"])
)(({ processedData = [] }) => (
  <Box fill flex justify="center" align="center">
    <Box pad="medium" style={{ maxWidth: "800px" }}>
      <List
        primaryKey="type"
        data={processedData}
        action={(event) => <ActivityItem event={event} />}
      />
    </Box>
  </Box>
));

export default Details;
