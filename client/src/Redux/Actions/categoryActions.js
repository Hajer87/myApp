import { GET_CATEGORY_LOADING, GET_CATEGORY_SUCESS, GET_CATEGORY_FAILED, ADD_CATEGORY_LOADING, ADD_CATEGORY_SUCESS, ADD_CATEGORY_FAILED, GET_ALL_CATEGORIES_LOADING, GET_ALL_CATEGORIES_SUCESS, GET_ALL_CATEGORIES_FAILED, DELETE_CATEGORY_LOADING, DELETE_CATEGORY_SUCESS, DELETE_CATEGORY_FAILED, UPDATE_CATEGORY_LOADING, UPDATE_CATEGORY_SUCESS, UPDATE_CATEGORY_FAILED } from "./types"
import axios from 'axios'
import setAuthToken from "../../helpers/setAuthToken";
 


// get one category
export const getCategory =(catId)=> async dispatch=>{
try{
dispatch({
type: GET_CATEGORY_LOADING
});
const response=await axios.get(`http://localhost:5000/categories/${catId}`)
dispatch({
type: GET_CATEGORY_SUCESS,
payload: response.data.categories
})

}catch (err){
dispatch({
type: GET_CATEGORY_FAILED,
payload: err.response.data.errors,
})

 }
}


// create a category
export const createCategory=(name,image)=>async dispatch =>{
    setAuthToken()
    let formData = new FormData()
    await formData.append("name", JSON.stringify(name)) 
    await formData.append("image", image)
    console.log(formData)
try{
dispatch({
type: ADD_CATEGORY_LOADING
})


const response= await axios.post ('http://localhost:5000/categories/newCategory',formData,  { headers: { 'Content-Type': 'multipart/form-data' }});
dispatch({
type: ADD_CATEGORY_SUCESS,
payload: response.data
})

}catch(err){
dispatch ({
type: ADD_CATEGORY_FAILED,
payload: err.response.data.errors
})
}
}


// get all categories
export const getCategories = () => async (dispatch) => {
 try {
dispatch({
type: GET_ALL_CATEGORIES_LOADING,
});
const response = await axios.get("http://localhost:5000/categories");
dispatch({
    type: GET_ALL_CATEGORIES_SUCESS,
    payload: response.data,
 });
 }catch(err){ ;
 dispatch({
 type: GET_ALL_CATEGORIES_FAILED,
 payload: err.response.data.errors
 }); 
}
};







// delete category
export const deleteCategory= (catId) => async (dispatch) => {
try {
dispatch({
type: DELETE_CATEGORY_LOADING,
 });
const response = await axios.delete(`/categories/${catId}`);
 dispatch({
 type: DELETE_CATEGORY_SUCESS , payload : response.data,
 });
 } catch (err) {
dispatch({
type: DELETE_CATEGORY_FAILED,
payload: err.response.data.errors,
 });
}
};

//Update category
export const updateCategory=(id, info, image)=> async (dispatch)=>{
    setAuthToken()
    try {
      dispatch({
        type: UPDATE_CATEGORY_LOADING,
      });
      const formData = new FormData()
        formData.append('info', JSON.stringify(info))
        formData.append('image', image) 
        
    console.log(formData)
      const response = await axios.put(`http://localhost:5000/categories/${id}`,formData);
      console.log(response)
      dispatch({
        type: UPDATE_CATEGORY_SUCESS,
        payload: response.data,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_CATEGORY_FAILED,
        payload: err.response.data.errors,
      });
    }
    }