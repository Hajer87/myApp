import React, { useState, useEffect } from "react";
import '../../assets/style/register.css'
import Navigation from "../LandingPag.js/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";
import { Register_User } from "../../Redux/Actions/AuthActions";

const Register = ({ history }) => {
  const auth = useSelector((state) => state.AuthReducer);
  localStorage.getItem("isAuth");
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.isAuth) {
      localStorage.setItem("isAuth", auth.isAuth);
      history.push("/");
    }
    
  }, [auth.isAuth, history, ]);

  const [newData, setNewData] = useState({
    firstname: "",
    lastname: "",
    ville: "",
    city: "",
    codePostal: "",
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
    <>

    <div className="box_register">
     
      <h2>Inscription</h2> 

    
      <Form className="signup-form" onSubmit={handleSubmit}>
        <Form.Group
          
          controlId="formBasicFirstname"
        >
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Prénom"
            name="firstname"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group
          
          controlId="formBasicLasttName"
        >
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom"
            name="lastname"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Cité</Form.Label>
            <Form.Control 
            type="text"
            placeholder="Cité"
            name="city"
            onChange={handleChange}
            required/>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Ville</Form.Label>
            <Form.Control 
            type="text"
            placeholder="ville"
            name="ville"
            onChange={handleChange}
            required/>
          </Form.Group>
          
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Code postal</Form.Label>
            <Form.Control type="number" name= "codePostal"onChange={handleChange} required />
          </Form.Group>
        </Form.Row>

        <Form.Group  controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter you email"
            name="email"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group
         
          controlId="formBasicPassword"
        >
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
        </Form.Group>
       
        <Button variant="secondary" type="submit">
         Enregistrer
        </Button>
      </Form> 
    

</div>
</>



    
  );
};

export default Register;
