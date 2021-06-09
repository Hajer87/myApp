import {
  ADD_ORDER_LOADING,
  DELETE_ORDER_FAILED,
  DELETE_ORDER_LOADING,
  DELETE_ORDER_SUCCESS,
  GET_ORDERS_FAILED,
  GET_ORDERS_SUCESS,
  UPDATE_ORDER_FAILED,
  UPDATE_ORDER_LOADING,
  UPDATE_ORDER_SUCCESS,
} from "../../Actions/types";

const initialState = {
  orders: [],
  isLoading: false,
  errors: null,
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_SUCESS:
      return {...state, isLoading:false, orders: action.payload}
    case UPDATE_ORDER_SUCCESS:
                             console.log(action.payload)
      return state.orders.map((order)=>order._id===action.payload._id ? {...order, delivred: !action.payload.delivred } : order)
    case DELETE_ORDER_SUCCESS:
                             console.log(action.payload)
      return state.orders.filter((el) => el._id !== action.payload._id);

    case DELETE_ORDER_LOADING:
    case ADD_ORDER_LOADING:
    case UPDATE_ORDER_LOADING:
      return { ...state, isLoading: true };
    case DELETE_ORDER_FAILED:
    case UPDATE_ORDER_FAILED:
    case GET_ORDERS_FAILED:
      return { ...state, isLoading: false, errors: action.payload };

    default:
      return state;
  }
};
export default ordersReducer;
