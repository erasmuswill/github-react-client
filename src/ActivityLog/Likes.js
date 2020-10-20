import { compose, withEffect, withMemo, withState } from "@truefit/bach";
import ActivityItem from "./ActivityItem";
import PouchDB from "pouchdb";
import { Box, List, Text } from "grommet";

const Likes = compose(
  withMemo("db", () => new PouchDB("read-later"), []),
  withState("processedData", "setProcessedData", undefined),
  withState("refreshFlag", "startRefresh", false),
  withEffect(
    ({ db, setProcessedData }) => {
      if (db)
        db.allDocs({ include_docs: true }).then((data) => {
          console.log(data);
          setProcessedData(data.rows.map(({ doc }) => doc));
        });
    },
    ["db", "refreshFlag"]
  )
)(({ processedData = [], setProcessedData, db, refreshFlag, startRefresh }) => (
  <Box fill flex justify="center" align="center">
    <Box pad="medium" style={{ maxWidth: "1000px" }}>
      {processedData && processedData.length ? (
        <List
          primaryKey="type"
          data={processedData}
          action={(event) => <ActivityItem event={event} />}
          onClickItem={({ item }) => {
            db.remove(item);
            startRefresh(!refreshFlag);
          }}
        />
      ) : (
        <Text>Go like some items :)</Text>
      )}
    </Box>
  </Box>
));

export default Likes;
