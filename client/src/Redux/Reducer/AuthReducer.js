import {
  REGISTER_SUCESS,
  LOAD_USER_SUCESS,
  LOADING_REGISTER,
  FAILED_REGISTER,
  LOADING_LOAD_USER,
  FAILED_LOAD_USER,
  LOADING_LOGIN,
  FAILED_LOGIN,
  LOGIN_SUCESS,
  LOG_OUT,
} from "../Actions/types.js";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  isAuth: false,
  errors: null,
  isLoading: false,
};

const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_SUCESS:
      return {
        ...state,
        token: payload.token,
        isAuth: true,
        isLoading: false,
        errors: null,
      };

    case LOAD_USER_SUCESS:
      return {
        ...state, 
        user: payload, 
        isAuth:true,
        isLoading: false, 
        errors: null };

    case LOGIN_SUCESS:
      return {
        ...state,
        token: payload.token,
        isAuth: true,
        isLoading: false,
        errors: null,
      };

    case LOG_OUT:
      localStorage.clear();
      localStorage.removeItem("token");
      return {
        ...state,
        token: localStorage.getItem("token"),
        isAuth: false,
        user: null,
        isLoading: false,
        errors: null,
      };

    case FAILED_LOGIN:
    case FAILED_LOAD_USER:
    case FAILED_REGISTER:
      localStorage.removeItem("token");
      return { ...state, errors: payload, isLoading: false };

    case LOADING_LOGIN:
    case LOADING_LOAD_USER:
    case LOADING_REGISTER:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
export default AuthReducer;
 




