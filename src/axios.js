import axios from 'axios';
import axiosRetry from 'axios-retry';
import { makeUseAxios } from 'axios-hooks'

const instance = axios.create({ baseURL: "https://reqres.in/api" });

axiosRetry(instance, { retryDelay: axiosRetry.exponentialDelay, retries: 5 });

const useAxios = makeUseAxios({
    axios: instance
});

export default axios;
export { useAxios };
