import { 
 ADD_INGREDIENT_FAILED,
 DELETE_INGREDIENT_FAILED,
GET_ALL_INGREDIENT_FAILED,
GET_INGREDIENT_FAILED,
ADD_INGREDIENT_SUCESS, 
DELETE_INGREDIENT_LOADING, 
DELETE_INGREDIENT_SUCESS, 
GET_INGREDIENT_LOADING, 
GET_INGREDIENT_SUCESS,
GET_ALL_INGREDIENT_SUCESS,
ADD_INGREDIENT_LOADING,
GET_ALL_INGREDIENT_LOADING,
UPDATE_INGREDIENT_SUCCESS,
UPDATE_INGREDIENT_FAILED,
UPDATE_INGREDIENT_LOADING,
 } from "../Actions/types"

const initialState={
ingredients:null,
isLoading: false,
errors:null
}


const ingredientReducer = (state=initialState, action) => {
switch (action.type) {
case ADD_INGREDIENT_SUCESS: 
return { ...state, isLoading:false ,ingredients: [...state.ingredients, action.payload]}
case GET_ALL_INGREDIENT_SUCESS:
return{ ...state, isLoading: false, ingredients:action.payload}
case DELETE_INGREDIENT_SUCESS: 
return { ...state, isLoading: false, ingredients: state.ingredients.filter(el=>el._id !==action.payload._id)}
case GET_INGREDIENT_SUCESS: 
return { ... state, ingredients: action.payload}
case UPDATE_INGREDIENT_SUCCESS:
return {...state, isLoading:false, ingredients: state.ingredients.map((el)=>el._id==action.payload._id? action.payload:el)}



case ADD_INGREDIENT_FAILED:
case DELETE_INGREDIENT_FAILED:
case GET_ALL_INGREDIENT_FAILED:
case GET_INGREDIENT_FAILED:
case UPDATE_INGREDIENT_FAILED:
                         return { ... state, isLoading: false, errors:action.payload}
                     
case ADD_INGREDIENT_LOADING:
case DELETE_INGREDIENT_LOADING:
case GET_ALL_INGREDIENT_LOADING:
case GET_INGREDIENT_LOADING:
case UPDATE_INGREDIENT_LOADING:
                         return {...state,isLoading: true };   
default: 
return state;  
}
}
export default ingredientReducer