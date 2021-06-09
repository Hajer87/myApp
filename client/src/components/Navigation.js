import React from "react";
import logo from '../assets/images/logo.png'

import {
  Nav,
  NavLink,
  Navbar,
  Container
} from 'react-bootstrap';

import { useDispatch, useSelector} from 'react-redux'
import { log_out } from "../Redux/Actions/AuthActions";
import { RiHomeSmileLine, RiShoppingCartFill } from "react-icons/ri";
import { useHistory } from "react-router";

const Navigation = () => {


  const dispatch = useDispatch()
  const history=useHistory()
   const Auth=useSelector(state=>state.AuthReducer)
   const user=JSON.parse(localStorage.getItem('user'))
  return (
    <>
    
  <Navbar bg="light" variant="light">
    <Container>
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="me-auto">
    <NavLink to='/' activeStyle>
          <RiHomeSmileLine/>
          </NavLink>
          <NavLink to='/panier' activeStyle>
          <RiShoppingCartFill/>
          </NavLink>
          
{(Auth.isAuth)?
<NavLink onClick={()=>{dispatch(log_out())}} >deconnexion</NavLink>
:
(<>
          <NavLink to='/signUp' activeStyle>
           s'enregistrer
          </NavLink>
          <NavLink to='/login' activeStyle>
           se connecter
          </NavLink>
          </>)}
{ (user)?
(user.isAdmin) ?           
<NavLink href="/admin">Admin</NavLink>
          : null
        :null} 
    </Nav>
    </Container>
  </Navbar>
</>
);
};

export default Navigation;
 












   /*  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
    <Nav>
  <NavLink to='/'>
        </NavLink>
        </Nav>
        <Nav>
        
       

          <NavLink to='/' activeStyle>
          <RiHomeSmileLine/>
          </NavLink>
          <NavLink to='/panier' activeStyle>
          <RiShoppingCartFill/>
          </NavLink>
          
{(Auth.isAuth)?
<NavLink onClick={()=>{dispatch(log_out())}} >deconnexion</NavLink>
:
(<>
          <NavLink to='/signUp' activeStyle>
           <h2>s'enregistrer</h>2
          </NavLink>
          <NavLink to='/login' activeStyle>
           se connecter
          </NavLink>
          </>)}
{ (user)?
(user.isAdmin) ?           
<NavLink href="/admin">Admin</NavLink>
          : null
        :null} 
</Nav>

</Container>
</Navbar> */
  