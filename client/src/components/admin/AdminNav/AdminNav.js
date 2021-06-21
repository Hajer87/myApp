import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { BsBoxArrowRight } from "react-icons/bs";
import { useDispatch } from "react-redux";
import logo from '../../../assets/images/logo.png'
import { log_out } from "../../../Redux/Actions/AuthActions";

const AdminNav = () => {
  const dispatch=useDispatch()
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home"><img src={logo} style={{width:"100px", heigth:"100px"}}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="btnNav" href="/"><span>Acceuil</span></Nav.Link>
          
          </Nav>
          <Nav>
            <Nav.Link  className="btnNav" href="/admin"><span>admin Dashboard</span></Nav.Link>
            <Nav.Link className="btnNav" 
                    onClick={() => {
                      dispatch(log_out());
                    }}
                  >
                    <BsBoxArrowRight />
                  </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AdminNav;
