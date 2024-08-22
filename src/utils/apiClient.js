import axios from "axios";
import Settings from "../utils/settings.json";

const apiClient = axios.create({
  baseURL: Settings[process.env.NODE_ENV].server_url,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("accessToken"))
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(async response => {
  const { data } = response;

  if (data.newTokens) {
    const { accessToken, accessTokenEndTime } = data.newTokens;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('accessTokenEndTime', accessTokenEndTime);

    response.config.headers['Authorization'] = `Bearer ${accessToken}`;

    return apiClient(response.config);
  }

  return response;
}, error => {
  return Promise.reject(error);
});

export default apiClient;
