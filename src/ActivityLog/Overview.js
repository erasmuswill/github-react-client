import { Box, List } from "grommet";
import { compose, withMemo } from "@truefit/bach";
import countBy from "underscore/modules/countBy.js";

const Overview = compose(
  withMemo(
    "topReposCount",
    ({ data }) => {
      const pushEventsRepoDetails = data
        .filter(({ type }) => type === "PushEvent")
        .map(({ repo: { id, name } }) => ({ id, name }));

      const pushEventPerRepo = countBy(
        pushEventsRepoDetails,
        ({ name }) => name
      );

      const sortedPushEventPerRepo = Object.entries(pushEventPerRepo)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => {
          if (a.count > b.count) return -1;
          if (b.count > a.count) return 1;

          return 0;
        });
      return sortedPushEventPerRepo;
    },
    ["data"]
  )
)(({ topReposCount }) => (
  <Box fill flex justify="center" align="center">
    <Box pad="medium" style={{ maxWidth: "800px" }}>
      <List primaryKey="count" secondaryKey="name" data={topReposCount} />
    </Box>
  </Box>
));

export default Overview;
