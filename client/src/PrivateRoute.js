import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";


const PrivateRoute = ({component: Component, ...rest}) => {
  const auth = useSelector((state) => state.AuthReducer);
  const token=localStorage.getItem('token')
    return(
   
  <Route {...rest} render={(props)=> !token ? <Redirect to='/login'/> : <Component {...props}/>}/>                       
 
    )
};

export default PrivateRoute;
