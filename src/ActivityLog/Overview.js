import { Box, List } from "grommet";
import { compose, withMemo } from "@truefit/bach";
import countBy from "underscore/modules/countBy.js";

const Overview =  compose(
  withMemo(
    "processedData",
    ({ data }) => {
      const pushEventRepos = data
        .filter(({ type }) => type === "PushEvent")
        .map(({ repo: { id, name } }) => ({ id, name }));
      const repoCount = countBy(pushEventRepos, ({ name }) => name);
      return Object.entries(repoCount)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => {
          if (a.count > b.count) return -1;
          if (b.count > a.count) return 1;

          return 0;
        }); // .reduce((accumulator, { repo: { id } })=>, []);
    },
    ["data"]
  )
)(({ processedData }) => (
  <Box fill flex justify="center" align="center">
    <Box
      pad="medium"
      style={{ maxWidth: "800px" }}
    >
      {console.table(processedData)}
      <List
        primaryKey="count"
        secondaryKey="name"
        data={processedData}
        onClickItem={({ name, count }) => {
          alert(name + count);
        }}
      />
    </Box>
  </Box>
));

export default Overview
