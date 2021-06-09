import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";


const PrivateRoute = ({component: Component, ...rest}) => {
  const auth = useSelector((state) => state.AuthReducer);
    return(
   
  <Route {...rest} render={(props)=> !auth.isAuth ? <Redirect to='/login'/> : <Component {...props}/>}/>                       
 
    )
};

export default PrivateRoute;
