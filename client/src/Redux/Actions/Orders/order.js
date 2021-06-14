import axios from "axios";
import setAuthToken from "../../../helpers/setAuthToken";
import {
  ADD_ORDER_FAILED,
  ADD_ORDER_LOADING,
  ADD_ORDER_SUCESS,
  DELETE_ORDER_FAILED,
  DELETE_ORDER_LOADING,
  DELETE_ORDER_SUCCESS,
  GET_ORDERS_FAILED,
  GET_ORDERS_LOADING,
  GET_ORDERS_SUCESS,
  UPDATE_ORDER_FAILED,
  UPDATE_ORDER_LOADING,
  UPDATE_ORDER_SUCCESS,
} from "../types";

export const addOrder = (order) => async (dispatch) => {
  setAuthToken();
  try {
    dispatch({
      type: ADD_ORDER_LOADING,
    });
    const reponse = await axios.post(
      "http://localhost:5000/orders/newOrder",
      order
    );

    await dispatch({
      type: ADD_ORDER_SUCESS,
      payload: reponse.data,
    });
    await dispatch(getOrders())
  } catch (err) {
    dispatch({
      type: ADD_ORDER_FAILED,
      payload: err.response.data.errors,
    });
  }
};

export const getOrders = () => async (dispatch) => {
  setAuthToken();

  try {
    dispatch({
      type: GET_ORDERS_LOADING,
    });
    const response = await axios.get("http://localhost:5000/orders");
    dispatch({
      type: GET_ORDERS_SUCESS,
      payload: response.data,
    });
  }catch (err) {
    dispatch({
      type: GET_ORDERS_FAILED,
      payload: err.response.data.errors,
    });
  }
};

 export const updateOrders = (id, data) => async (dispatch) => {
  setAuthToken();
  try {
    dispatch({
      type: UPDATE_ORDER_LOADING,
    });
    const { data } = await axios.put(
      `http://localhost:5000/orders/${id}`,
      {} 
    );
   
   await dispatch({ type: UPDATE_ORDER_SUCCESS , payload: data });
   await dispatch(getOrders())

  } catch (err) {
    dispatch({
      type: UPDATE_ORDER_FAILED,
      payload: err.response.data.errors,
    });
  }
}; 

export const deleteOrder = (id) => async (dispatch) => {
  setAuthToken();
  try {
    dispatch({
      type: DELETE_ORDER_LOADING,
    });
    console.log(id)
    const response = await axios.delete(`http://localhost:5000/orders/${id}`);

    console.log(response);
   await dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: response.data,
    });
    await dispatch(getOrders())

  } catch (err) {
    dispatch({
      type: DELETE_ORDER_FAILED,
      payload: err.response.data.errors,
    });
  }
};
