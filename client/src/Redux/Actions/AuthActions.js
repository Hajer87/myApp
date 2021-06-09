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
  
} from "./types";
import axios from "axios";
import setAuthToken from '../../helpers/setAuthToken';


//register user
export const Register_User = (User_info) => (dispatch) => {
  dispatch({
    type: LOADING_REGISTER,
  });
  axios
    .post("http://localhost:5000/signUp", User_info)
    .then(({ data }) =>{
      const {token}=data
      localStorage.setItem("token", token);
      dispatch({
        type: REGISTER_SUCESS,
        payload: data,
      })
/*       localStorage.setItem('userInfo', JSON.stringify(data));
 */
    }
     
    )
    .catch((err) =>
      dispatch({
        type: FAILED_REGISTER,
        payload: err.response.data.errors,
      })
    );
};

//load user
export const load_user =()=>(dispatch)=>{
 setAuthToken();
 dispatch({              
type: LOADING_LOAD_USER
 })
axios
.get('http://localhost:5000/login/user')
.then(({ data }) =>{
  localStorage.setItem("user", JSON.stringify(data));

 dispatch({
  type: LOAD_USER_SUCESS,
  payload: data
}) 

})
.catch((err) =>
dispatch({
  type: FAILED_LOAD_USER,
  payload: err.response.data.errors,
})
);
}


//LOGIN USER
export const login_user =(data)=>(dispatch)=>{
  dispatch({
    type: LOADING_LOGIN
  })
  setAuthToken()
  axios.post('http://localhost:5000/login', data)
  .then(({ data }) =>{
    const {token}=data
    localStorage.setItem("token", token);
    dispatch({
     type: LOGIN_SUCESS,
     payload: data
   }) 
   })
   .catch((err) =>
   dispatch({
     type: FAILED_LOGIN,
     payload: err.response.data.errors,
   })
   );
}
 
//LOG OUT
export const log_out =()=>(dispatch) => {
  dispatch({
    type: LOG_OUT
  })
  
};

 

