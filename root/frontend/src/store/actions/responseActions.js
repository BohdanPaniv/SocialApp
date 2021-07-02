import { CLEAR_RESPONSE, GET_RESPONSE } from "./types";

export const returnResponse = (message, status, id) => {
  return {
    type: GET_RESPONSE,
    payload: { message, status, id }
  };
};

export const clearResponse = () => {
  return {
    type: CLEAR_RESPONSE
  };
};

