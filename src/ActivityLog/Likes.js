import { compose, withEffect, withMemo, withState } from "@truefit/bach";
import ActivityItem from "./ActivityItem";
import PouchDB from "pouchdb";
import { Box, List, Text } from "grommet";

const Likes = compose(
  withMemo("db", () => new PouchDB("read-later"), []),
  withState("likedItems", "setLikedItems", undefined),
  withState("refreshFlag", "setRefreshFlag", false),
  withEffect(
    ({ db, setLikedItems }) => {
      if (db)
        db.allDocs({ include_docs: true }).then((data) => {
          console.log(data);
          setLikedItems(data.rows.map(({ doc }) => doc));
        });
    },
    ["db", "refreshFlag"]
  )
)(({ likedItems = [], db, refreshFlag, setRefreshFlag }) => (
  <Box fill flex justify="center" align="center">
    <Box pad="medium" style={{ maxWidth: "1000px" }}>
      {likedItems && likedItems.length ? (
        <List
          primaryKey="type"
          data={likedItems}
          action={(event) => <ActivityItem event={event} />}
          onClickItem={({ item }) => {
            db.remove(item);
            setRefreshFlag(!refreshFlag);
          }}
        />
      ) : (
        <Text>Go like some items :)</Text>
      )}
    </Box>
  </Box>
));

export default Likes;
