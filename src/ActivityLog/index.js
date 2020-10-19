import { useEffect, useState } from "react";
import axios from "../axios";

export default ({ type, resource }) => {
  const [data, setData] = useState([]);
  const [etag, setEtag] = useState("");
  const [loading, setLoading] = useState(true);
  const [interval, setIntervalRef] = useState(null);
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
  }, []);
  console.log({ type, resource });
  return <div>Hi</div>;
};
