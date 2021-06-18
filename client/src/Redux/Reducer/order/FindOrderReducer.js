import { GET_ORDER_FAILED, GET_ORDER_LOADING, GET_ORDER_SUCCESS } from "../../Actions/types";

const findOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ORDER_SUCCESS:
      return { ...state, isLoading: false, order: action.payload };

    case GET_ORDER_LOADING:
      return { ...state, isLoading: true };

    case GET_ORDER_FAILED:
      return { ...state, isLoading: false, errors: action.payload };
    default:
      return state;
  }
};
export default findOrderReducer;
