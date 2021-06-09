import { ADD_TO_BOL_FAILED, ADD_TO_BOL_LOADING, ADD_TO_BOL_SUCESS, DELETE_BOL, DELETE_FROM_BOL, FAILED_REGISTER, RESET_BOL } from "../../Actions/types"


const initialState={
             
content:[],  
isLoading: false,
errors: null                
}

 const contentReducer =(state=initialState, action)=>{
switch (action.type){
case ADD_TO_BOL_SUCESS: 
 return {... state,  isLoading: false, errors:null, content:[...state.content, action.payload]}
 case DELETE_FROM_BOL: 
 return  {...state, content: state.content.filter((ingredient)=>ingredient._id!==action.payload) }
 case RESET_BOL:
                          return initialState
 default: 
 return state
}
}
export default contentReducer