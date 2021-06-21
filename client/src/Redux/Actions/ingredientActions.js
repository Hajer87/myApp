import {
  GET_INGREDIENT_FAILED,
  GET_INGREDIENT_LOADING,
  GET_INGREDIENT_SUCESS,
  ADD_INGREDIENT_LOADING,
  ADD_INGREDIENT_SUCESS,
  ADD_INGREDIENT_FAILED,
  DELETE_INGREDIENT_FAILED,
  DELETE_INGREDIENT_LOADING,
  DELETE_INGREDIENT_SUCESS,
  GET_ALL_INGREDIENT_LOADING,
  GET_ALL_INGREDIENT_SUCESS,
  GET_ALL_INGREDIENT_FAILED,
  UPDATE_INGREDIENT_LOADING,
  UPDATE_INGREDIENT_SUCCESS,
  UPDATE_INGREDIENT_FAILED,
} from "./types";
import axios from 'axios'
import setAuthToken from "../../helpers/setAuthToken";
import { getCategories } from "./categoryActions";



// get all ingredients
  export const getIngredients = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_INGREDIENT_LOADING,
    });
    
    const response = await axios.get("http://localhost:5000/ingredients");
    dispatch({
      type: GET_ALL_INGREDIENT_SUCESS,
      payload: response.data,
    });
  }catch (err) {
    dispatch({
      type: GET_ALL_INGREDIENT_FAILED,
      payload: err.response.data.errors,
    });
  }
};



//create a new ingredient
export const createIngredient = (data, image) => async (dispatch) => {
  setAuthToken()
    try {
    dispatch({
      type: ADD_INGREDIENT_LOADING,
    });
    const formData = new FormData()
    await formData.append('data', JSON.stringify(data))
    await formData.append('image', image)
    const response = await axios.post("http://localhost:5000/ingredients/newIngredient", formData,  { headers: { 'Content-Type': 'multipart/form-data' }});;
    
   await dispatch({
      type: ADD_INGREDIENT_SUCESS,
      payload: response.data
    });
    dispatch(getCategories())
  } catch (err) {
    dispatch({
      type: ADD_INGREDIENT_FAILED,
      payload: err.response.data.errors,
    });
  }
};

// delete an ingredient
export const deleteIngredient = (ingId) => async (dispatch) => {
  setAuthToken()
  try {
    dispatch({
      type: DELETE_INGREDIENT_LOADING,
    });
    const response = await axios.delete(`http://localhost:5000/ingredients/${ingId}`);
    console.log((response))
    dispatch({
      type: DELETE_INGREDIENT_SUCESS ,
      payload : response.data,
    });

    // await dispatch(getIngredients())
    await dispatch(getCategories())

  } catch (err) {
    dispatch({
      type: DELETE_INGREDIENT_FAILED,
      payload: err.response.data.errors,
    });
  }
};


// get one ingredient
export const getIngredient = (ingId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_INGREDIENT_LOADING,
    });
    const response = await axios.get(`/ingredients/${ingId}`);
    dispatch({
      type: GET_INGREDIENT_SUCESS,
      payload: response.data.ingredient,
    });
  } catch (err) {
    dispatch({
      type: GET_INGREDIENT_FAILED,
      payload: err.response.data.errors,
    });
  }
};
 
export const updateIngredient=(id, info, image)=> async (dispatch)=>{
setAuthToken()
try {
  dispatch({
    type: UPDATE_INGREDIENT_LOADING,
  });
  const formData = new FormData()

    formData.append('info', JSON.stringify(info))
    formData.append('image', image) 
    /* const body=
     (image)? 
        { formData
      }
        
        : info */
    
  const response = await axios.put(`http://localhost:5000/ingredients/${id}`,formData);

  await dispatch({
    type: UPDATE_INGREDIENT_SUCCESS,
    payload: response.data,
  });
  await dispatch(getCategories())

} catch (err) {
  dispatch({
    type: UPDATE_INGREDIENT_FAILED,
    payload: err.response.data.errors,
  });
}
}