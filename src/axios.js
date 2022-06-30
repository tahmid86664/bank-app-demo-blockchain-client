import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://blockchain-bank-app-demo.herokuapp.com/"
      : "http://localhost:9000",
});

export default instance;
