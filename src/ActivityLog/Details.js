import { compose, withMemo } from "@truefit/bach";
import ActivityItem from "./ActivityItem";
import PouchDB from "pouchdb";
import { Box, List } from "grommet";

const Details = compose(
  withMemo("db", () => new PouchDB("read-later"), [])
)(({ data = [], db }) => (
  <Box fill flex justify="center" align="center">
    <Box pad="medium" style={{ maxWidth: "1000px" }}>
      <List
        primaryKey="type"
        data={data}
        action={(event) => <ActivityItem event={event} />}
        onClickItem={({ item }) => {
          db.put({ ...item, _id: item.id });
        }}
      />
    </Box>
  </Box>
));

export default Details;
