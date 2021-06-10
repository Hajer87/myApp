import { UPDATE_ORDER_FAILED, UPDATE_ORDER_LOADING, UPDATE_ORDER_SUCCESS } from "../../Actions/types";

 const orderUpdateReducer = (state = {}, action) => {
                         const { type, payload } = action;
                         switch (type) {
                           case UPDATE_ORDER_LOADING:
                             return { loading: true };
                           case UPDATE_ORDER_SUCCESS:
                             return { loading: false, success: true };
                           case UPDATE_ORDER_FAILED:
                             return { loading: false, error: payload };
                           /* case ORDER_DELIVER_RESET:
                             return {}; */
                           default:
                             return state;
                         }
                       };
                       export default orderUpdateReducer