import { Text } from "grommet";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

const getMessageNode = (event) =>
  ((
    {
      // CommitCommentEvent: (type) => <Text>{JSON.stringify(type)}</Text>,
      CreateEvent: ({
        payload: { ref_type, ref },
        repo: { name },
        created_at,
      }) => (
        <Text>
          created {ref_type} {ref} at {name}{" "}
          <ReactTimeAgo date={new Date(created_at)} />
        </Text>
      ),
      DeleteEvent: ({
        payload: { ref_type, ref },
        repo: { name },
        created_at,
      }) => (
        <Text>
          deleted {ref_type} {ref} at {name}{" "}
          <ReactTimeAgo date={new Date(created_at)} />
        </Text>
      ),
      // ForkEvent: (type) => <Text>{JSON.stringify(type)}</Text>,
      // GollumEvent: (type) => <Text>{JSON.stringify(type)}</Text>,
      // IssueCommentEvent: (type) => <Text>{JSON.stringify(type)}</Text>,
      // IssuesEvent: (type) => <Text>{JSON.stringify(type)}</Text>,
      // MemberEvent: (type) => <Text>{JSON.stringify(type)}</Text>,
      // PublicEvent: (type) => <Text>{JSON.stringify(type)}</Text>,
      PullRequestEvent: ({
        payload: {
          action,
          pull_request: { html_url, title },
        },
        created_at,
      }) => (
        <Text>
          {action} pull request: <a href={html_url}>{title}</a>{" "}
          <ReactTimeAgo date={new Date(created_at)} />
        </Text>
      ),
      // PullRequestReviewCommentEvent: (type) => (
      //   <Text>{JSON.stringify(type)}</Text>
      // ),
      PushEvent: ({ payload: { ref = "" }, repo: { name }, created_at }) => (
        <Text>
          pushed to{" "}
          {ref.includes("refs/heads/") && ref.split("/").slice(2).join("/")}{" "}
          {name} <ReactTimeAgo date={new Date(created_at)} />
        </Text>
      ),
      // ReleaseEvent: (type) => <Text>{JSON.stringify(type)}</Text>,
      // SponsorshipEvent: (type) => <Text>{JSON.stringify(type)}</Text>,
      // WatchEvent: (type) => <Text>{JSON.stringify(type)}</Text>,
    }[event.type] || (() => null)
  )(event));

const ActivityItem = ({ event }) => {
  return getMessageNode(event);
};

export default ActivityItem;
