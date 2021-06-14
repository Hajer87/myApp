import axios from "axios";
import setAuthToken from "../../helpers/setAuthToken";
import { GET_USERS_SUCCESS, GET_USERS_FAILED,GET_USERS_LOADING, UPDATE_USER_LOADING, UPDATE_USER_FAILED, UPDATE_USER_SUCCESS  } from "./types";

  const getUsers = () => async (dispatch) => {
                          setAuthToken()
  try {
    dispatch({
      type: GET_USERS_LOADING,
    });

    const response = await axios.get("http://localhost:5000/users");
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: GET_USERS_FAILED,
      payload: err.response.data.errors,
    });
  }
};
export default getUsers

export const updateUser=(id, update)=> async (dispatch)=>{
  setAuthToken()
  try {
    dispatch({
      type: UPDATE_USER_LOADING,
    });
   
      
    const response = await axios.put(`http://localhost:5000/users/${id}`,update);
  
    await dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: response.data,
    });
  await dispatch(getUsers())
  } catch (err) {
    dispatch({
      type: UPDATE_USER_FAILED,
      payload: err.response.data.errors,
    });
  }
  }
