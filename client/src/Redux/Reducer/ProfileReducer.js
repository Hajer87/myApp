import {
  GET_PROFILE_FAILED,
  GET_PROFILE_SUCESS,
  LOADING_PROFILE,
} from "../Actions/types";

const initialState = {
  profile: null,

  isloading: false,
};

const ProfileReducer= (state = initialState, action) =>{
  switch (action.type) {
    case LOADING_PROFILE:
      return {
        ...state,
        isloading: true,
      };
    case GET_PROFILE_SUCESS:
      return {
        ...state,
        profile: action.payload,
        isloading: false,
      };
    case GET_PROFILE_FAILED:
      return {
        profile: null,
        isLoading: false,
      };
    default:
      return state;
  }
}
export default ProfileReducer