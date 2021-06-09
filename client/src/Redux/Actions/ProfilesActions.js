/* import { GET_PROFILE_FAILED, GET_PROFILE_SUCESS, LOADING_PROFILE } from "./types";
import axios from 'axios'
import setAuthToken from '../../helpers/setAuthToken';



//get clients profile
export const getProfile = () =>  dispatch => {
                         setAuthToken();
 dispatch({
type: LOADING_PROFILE})
 axios
 .get('/profile/client/me')
 .then(res=> 
dispatch({
 type: GET_PROFILE_SUCESS,
 payload:res.data,
})
  )
.catch((err)=>{
dispatch({
 type: GET_PROFILE_FAILED,
 payload: err.response.data.errors,
})
})
}
 */