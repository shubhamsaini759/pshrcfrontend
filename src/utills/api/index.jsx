import axios from "axios";


export default axios.create({
    baseURL : "http://127.0.0.1:4000/",
  
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });
