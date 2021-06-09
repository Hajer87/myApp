import {
  ADD_ORDER_FAILED,
  ADD_ORDER_LOADING,
  ADD_ORDER_SUCESS,
  DELETE_CATEGORY_SUCESS,
  DELETE_ORDER_SUCCESS,
  GET_ORDERS_FAILED,
  GET_ORDERS_LOADING,
  GET_ORDERS_SUCESS,
  UPDATE_ORDER_FAILED,
  UPDATE_ORDER_LOADING,
  UPDATE_ORDER_SUCCESS,
} from "../../Actions/types";

const initialState = {
  commandes: null,
  date: null,
  heure: null,
  tel: null,
  address: null,
  livraison: null,
  total: 0,
  user: null,
  status:null,
  isLoading: false,
  errors: null,
};
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_SUCESS:
      return action.payload;
   /*  case GET_ORDERS_SUCESS:
      return action.payload; */
    /* case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        status:action.payload */

      
    /* case DELETE_ORDER_SUCCESS:
      return state.commandes.filter((el) => el._id !== action.payload._id); */

    /* case GET_ORDERS_LOADING: */
    case ADD_ORDER_LOADING:
    
      return { ...state, isLoading: true };

   /*  case UPDATE_ORDER_FAILED:
    case GET_ORDERS_FAILED: */
    case ADD_ORDER_FAILED:
      return { ...state, isLoading: false, errors: action.payload };

    default:
      return state;
  }
};
export default orderReducer;
