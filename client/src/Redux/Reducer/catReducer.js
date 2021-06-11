import { GET_CATEGORY_FAILED, GET_CATEGORY_LOADING, GET_CATEGORY_SUCESS } from "../Actions/types";

const catReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORY_SUCESS:
      return { ...state, isLoading: false, category: action.payload };
    

    
    case GET_CATEGORY_LOADING:
    
      return { ...state, isLoading: true };

   
    case GET_CATEGORY_FAILED:
    
      return { ...state, isLoading: false, errors: action.payload };
    default:
      return state;
  }
};
export default catReducer;
