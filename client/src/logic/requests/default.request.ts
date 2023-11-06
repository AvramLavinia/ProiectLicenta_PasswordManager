import AXIOS from "axios";

const axios = AXIOS.create({
  baseURL: "http://localhost:3001",
});

export default axios;
