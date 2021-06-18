import {
  ADD_ORDER_LOADING,
  DELETE_ORDER_FAILED,
  DELETE_ORDER_LOADING,
  DELETE_ORDER_SUCCESS,
  GET_ORDERS_FAILED,
  GET_ORDERS_SUCESS,
  
} from "../../Actions/types";

const initialState = {
  orders: null,
  isLoading: false,
  errors: null,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_SUCESS:
      return {...state, isLoading:false, orders: action.payload}
    
    case DELETE_ORDER_SUCCESS:
      return state.orders.filter((el) => el._id !== action.payload);

    case DELETE_ORDER_LOADING:
    case ADD_ORDER_LOADING:
    
      return { ...state, isLoading: true };

    case DELETE_ORDER_FAILED:
    case GET_ORDERS_FAILED:
      return { ...state, isLoading: false, errors: action.payload };

    default:
      return state;
  }
};
export default ordersReducer;
