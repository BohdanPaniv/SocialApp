import axios from "axios";

// const instance = axios.create({
//   withCredentials: true,
// });

export const loginCall = async (data) => {
  return await axios
    .post("auth/login", data)
    .catch(error => {
      return error.response.data;
  });
}

export const registerCall = async (data) => {
  return await axios
    .post("auth/register", data)
    .catch(error => {
      return error.response.data;
  });
}
