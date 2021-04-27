import axios from "axios";

export default axios.create({
  baseURL: "https://tasky-codex.herokuapp.com/",
});