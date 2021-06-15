import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import logo from '../../../assets/images/logo.png'

const AdminNav = () => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home"><img src={logo} style={{width:"100px", heigth:"100px"}}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Acceuil</Nav.Link>
          
          </Nav>
          <Nav>
            <Nav.Link href="/admin/commandes">gestion des commandes</Nav.Link>
            <Nav.Link href="/admin/userlist">Liste des utilisateurs</Nav.Link>
            <Nav.Link eventKey={2} href="/admin/productlist">
              gestion des produits
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AdminNav;
