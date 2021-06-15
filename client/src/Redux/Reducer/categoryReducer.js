import { ADD_CATEGORY_FAILED, ADD_CATEGORY_LOADING, ADD_CATEGORY_SUCESS, DELETE_CATEGORY_SUCESS, GET_ALL_CATEGORIES_FAILED, GET_ALL_CATEGORIES_LOADING, GET_ALL_CATEGORIES_SUCESS, GET_CATEGORY_FAILED, GET_CATEGORY_LOADING, GET_CATEGORY_SUCESS, UPDATE_CATEGORY_FAILED, UPDATE_CATEGORY_LOADING, UPDATE_CATEGORY_SUCESS } from "../Actions/types";
const initialState = {
  categories: null,
  isLoading:false,
  errors: null
};
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_CATEGORY_SUCESS:
  return { ...state, isLoading: false, categories: action.payload };
  case ADD_CATEGORY_SUCESS: 
  return { ...state, isLoading: false, categories:[...state.categories, action.payload]};
  case GET_ALL_CATEGORIES_SUCESS:
  return {...state, isLoading:false, categories: action.payload};
case DELETE_CATEGORY_SUCESS:
  return{...state, isLoading:false, categories: state.categories.filter(el=>el._id !==action.payload._id)}
  case UPDATE_CATEGORY_SUCESS:
    return {...state, isLoading:false, categories: state.categories.map((el)=>el._id===action.payload._id? action.payload:el)}
    
    
  case GET_ALL_CATEGORIES_LOADING:
  case ADD_CATEGORY_LOADING:
  case GET_CATEGORY_LOADING:
  case UPDATE_CATEGORY_LOADING:
  return { ...state, isLoading: true}


  case GET_ALL_CATEGORIES_FAILED:
  case ADD_CATEGORY_FAILED:
  case GET_CATEGORY_FAILED:
  case UPDATE_CATEGORY_FAILED:
  return { ...state, isLoading: false, errors:action.payload}
  default: 
  return state;
  }
};
export default categoryReducer