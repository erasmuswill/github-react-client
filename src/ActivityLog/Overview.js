import { Box, List } from "grommet";
import { compose, withMemo } from "@truefit/bach";
import countBy from "underscore/modules/countBy.js";

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const mapPushEventsToRepoDetails = (events) => {
  let pushEventsRepoDetails = [];
  for (let i = 0; i < events.length; i++) {
    const {
      type,
      repo: { id, name },
    } = events[i];
    if (type !== "PushEvent") break;
    pushEventsRepoDetails.push({ id, name });
  }
  return pushEventsRepoDetails;
};

const getPushEventsPerRepo = (pushEventsRepoDetails) =>
  countBy(pushEventsRepoDetails, ({ name }) => name);

const mapPushEventByCountObjectToArray = (pushEventPerRepo) =>
  Object.entries(pushEventPerRepo).map(([name, count]) => ({ name, count }));

const sortByCount = (pushEventPerRepo) =>
  pushEventPerRepo.sort((a, b) => (a.count > b.count ? -1 : 1));

const Overview = compose(
  withMemo(
    "topReposCount",
    ({ data }) =>
      pipe(
        mapPushEventsToRepoDetails,
        getPushEventsPerRepo,
        mapPushEventByCountObjectToArray,
        sortByCount
      )(data),
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
