import { UPDATE_USER_FAILED, UPDATE_USER_LOADING, UPDATE_USER_SUCCESS } from "../Actions/types";

const orderUpdateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER_LOADING:
      return { loading: true };
    case UPDATE_USER_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_USER_FAILED:
      return { loading: false, error: payload };
    
    default:
      return state;
  }
};
export default orderUpdateReducer;
