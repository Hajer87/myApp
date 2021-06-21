import React, {useState, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import {  load_user,  login_user } from "../../Redux/Actions/AuthActions";
import {Link} from 'react-router-dom'
import '../../assets/style/login.css'
import Loading from "../Loading";
import Navigation from "../LandingPag.js/navigation";
import { Button } from "react-bootstrap";




const Login = ({history}) => {
  const auth = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const [info, setInfo] = useState({ email: '', password: '' });
  const { email, password } = info;
  const[errors, setErrors]=useState(null)


    useEffect(() => {
    if (auth.isAuth) {
      dispatch(load_user()) 
      
      history.push("/");}
     else
      {setErrors(auth.errors)}
      

   
  },[ auth.isAuth,  history, auth.errors]);  

    const submitHandler = (e) => {
    e.preventDefault();
    
    dispatch(login_user(info));

  };

  const changeHandler = (e) => setInfo({ ...info, [e.target.name]: e.target.value });

  if (auth.isLoading) {
    return <Loading />;
  }
  
  return (
 <>
 <Navigation/>
<div className="container h-100">
  <div className="row h-100 justify-content-center align-items-center">
    <form className="col-md-9">
      <div className="AppForm shadow-lg">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="AppFormLeft">
              <h2>Connexion</h2>
              <div onSubmit={submitHandler} className="form-group position-relative mb-4">
                <input 
                onFocus={()=>setErrors(null)} 

                type="text" 
                className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" 
                id="username" 
                placeholder="Username" 
                name="email"
                value={email}
                required
                onChange={changeHandler}/>
                <i className="fa fa-user-o" />
              </div>
              <div className="form-group position-relative mb-4">
                <input 
                onFocus={()=>setErrors(null)} 

                type="password" 
                className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" 
                id="password" 
                placeholder="Password"  
                name="password"
                value={password}
                onChange={changeHandler}
                required
                />
                <i className="fa fa-key" />
              </div>
              {errors && errors.map((error)=> <h5 className="errors">{error.msg}</h5>)}

              <button 
              onClick={submitHandler} 
            
              className=" btn-success btn-block shadow border-0 py-2 text-uppercase " >
               se connecter
              </button>
              <p className="text-center mt-5">
                vous n'êtes pas encore inscrit?
                <Link to={"/SignUp"} className="signUp">
                  <a>s'enregistrer</a>
                </Link>
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-5 text-white">
              <h2 className="position-relative px-4 pb-3 mb-4">Welcome</h2>
              
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</div>    

</>
);
};


export default Login