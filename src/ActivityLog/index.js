import { Avatar, Tabs, Tab, Box, Heading, Text, TextInput } from "grommet";
import Overview from "./Overview";
import { useEffect, useMemo, useState } from "react";
import axios from "../axios";
import BlockUi from "react-block-ui";
import Fuse from "fuse.js";

const ActivityLog = ({ type, resource }) => {
  const [data, setData] = useState([]);
  const [etag, setEtag] = useState("");
  const [loading, setLoading] = useState(true);
  const [interval, setIntervalRef] = useState(null);
  const [filter, setFilter] = useState("");
  const fuse = useMemo(
    () =>
      data.length
        ? new Fuse(data, {
            keys: ["id", "type", "repo.name"],
          })
        : { search: () => [] },
    [data]
  );
  const processedData = useMemo(() => {
    if (!filter) return data;
    console.log(fuse.search(filter));
    // return data;
    return fuse.search(filter).map(({ item }) => item);
  }, [data, fuse, filter]);
  const fetchData = () => {
    if (interval) clearInterval(interval);
    let config = { url: "/" + type + "s/" + resource + "/events" };
    if (etag) config = { ...config, headers: { "If-None-Match": etag } };
    axios(config)
      .then(
        ({
          data: newData,
          headers: { etag, "x-poll-interval": poll = 60 },
        }) => {
          console.log({ newData, poll, etag });
          setData([...newData, ...data]);
          setEtag(etag);

          setIntervalRef(setInterval(() => fetchData(), poll * 1000));
          setLoading(false);
        }
      )
      .catch((error) => {
        if (error.response && error.response.status === 304)
          console.log("Not modified!");
        else alert("Please refresh the page");
      });
  };
  useEffect(() => {
    if (interval) clearInterval(interval);
    fetchData();
    // Disabling because this hook should only run if the input changes
    // eslint-disable-next-line
  }, [type, resource]);
  return (
    <Box pad="medium" basis="medium">
      <BlockUi loading={loading}>
        <Box fill flex justify="center" align="center">
          <Box pad="medium">
            <TextInput
              placeholder="search"
              value={filter}
              onChange={({ target: { value } }) => setFilter(value)}
            />
          </Box>
        </Box>
        {data.length ? (
          <>
            <Box direction="row" justify="center" alignItems="center" flex>
              <Avatar
                size="large"
                margin="small"
                src={data[0].actor.avatar_url}
              ></Avatar>
              <Heading margin="small">{data[0].actor.display_login}</Heading>
            </Box>
            <Tabs>
              <Tab title="Top Repos">
                <Overview data={processedData} />
              </Tab>
            </Tabs>
          </>
        ) : (
          <Text>No content (yet)</Text>
        )}
      </BlockUi>
    </Box>
  );
};

export default ActivityLog;
