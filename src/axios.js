import axios from 'axios';
import axiosRetry from 'axios-retry';
import { makeUseAxios } from 'axios-hooks'

const instance = axios.create({
  baseURL: "https://api.github.com",
  // Add your username and access token here:
  // auth: {
  //   username: "erasmuswill",
  //   password: "xxx",
  // },
});

axiosRetry(instance, { retryDelay: axiosRetry.exponentialDelay, retries: 5 });

const useAxios = makeUseAxios({
    axios: instance
});

export default instance;
export { useAxios };
