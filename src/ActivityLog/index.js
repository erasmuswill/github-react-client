import { Avatar, Tabs, Tab, Box, Heading, Text, TextInput } from "grommet";
import Overview from "./Overview";
import { useEffect, useMemo, useState } from "react";
import axios from "../axios";
import Details from "./Details";
import Fuse from "fuse.js";
import Likes from "./Likes";

const ActivityLog = ({ type, resource }) => {
  const [data, setData] = useState([]);
  const [etag, setEtag] = useState("");
  const [loading, setLoading] = useState(true);
  const [intervalRef, setIntervalRef] = useState(null); // This holds the interval return value, used for cancelling the interval
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

  const filteredData = useMemo(() => {
    if (!filter) return data;
    return fuse.search(filter).map(({ item }) => item);
  }, [data, fuse, filter]);

  const fetchData = () => {
    if (intervalRef) clearInterval(intervalRef);
    let config = { url: "/" + type + "s/" + resource + "/events" };
    if (etag) config = { ...config, headers: { "If-None-Match": etag } }; // etag is not set on first request
    axios(config)
      .then(
        ({
          data: newData,
          headers: { etag, "x-poll-interval": poll = 60 },
        }) => {
          setData([...newData, ...data]);
          setEtag(etag);

          setIntervalRef(setInterval(() => fetchData(), poll * 1000));
          setLoading(false);
        }
      )
      .catch((error) => {
        if (error.response)
          switch (error.response.status) {
            case 304:
              console.log("Not modified!");
              break;
            default:
              clearInterval(intervalRef);
              alert("Please refresh the page");
              break;
          }
        else {
          clearInterval(intervalRef);
          alert("Please refresh the page");
        }
      });
  };;

  // Restarts the interval if input changes programatically
  useEffect(() => {
    if (intervalRef) clearInterval(intervalRef);
    fetchData();
    // Disabling because this hook should only run if the input changes
    // eslint-disable-next-line
  }, [type, resource]);

  return (
    <Box pad="medium" basis="medium">
      <Box fill flex justify="center" align="center">
        <Box pad="medium">
          <TextInput
            placeholder="search"
            value={filter}
            onChange={({ target: { value } }) => setFilter(value)}
          />
        </Box>
      </Box>
      {data.length && !loading ? (
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
              <Overview data={filteredData} />
            </Tab>
            <Tab title="Details">
              <Details data={filteredData} />
            </Tab>
            <Tab title="Likes">
              <Likes />
            </Tab>
          </Tabs>
        </>
      ) : (
        <Box fill flex justify="center" align="center">
          <Box pad="medium" style={{ maxWidth: "800px" }}>
            <Text>No content (yet)</Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};;

export default ActivityLog;
