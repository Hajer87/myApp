import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Register_User } from "../../Redux/Actions/AuthActions";


const Register = ({history}) => {
  const auth = useSelector((state) => state.AuthReducer);
  localStorage.getItem('isAuth')
  const dispatch = useDispatch();
  const [errors, setErrors]=useState(null)

  useEffect(() => {
    if (auth.isAuth) {
     localStorage.setItem('isAuth', auth.isAuth)
      history.push("/");
    }
    if (auth.errors){ setErrors(auth.errors)}
  },[ auth.isAuth, history, auth.errors]); 

  const [newData, setNewData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  }); 
  
  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(Register_User(newData));
  
  };
  
  return (
    <div>
      
     <h1>Register page</h1>
    


       <Form  className='signup-form' onSubmit={handleSubmit}>
        <Form.Group onFocus={()=>setErrors(null)} controlId="formBasicFirstname">
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="firstname"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group onFocus={()=>setErrors(null)} controlId="formBasicLasttName">
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your lastname"
            name="lastname"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group onFocus={()=>setErrors(null)} controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter you email"
            name="email"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group onFocus={()=>setErrors(null)} controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>
        {errors && errors.map((error)=> <h5>{error.msg}</h5>)} 
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form> 
    
    </div>
  );
};

export default Register;