import { CLEAR_RESPONSE, GET_RESPONSE } from '../actions/types';

const initialState = {
  message: null,
  status: null,
  id: null
};

export default function responseReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RESPONSE:
      return {
        message: action.payload.message?.message,
        status: action.payload.status,
        id: action.payload.id
      };
    case CLEAR_RESPONSE:
      return {
        message: null,
        status: null,
        id: null
      };
    default:
      return state;
  }
}