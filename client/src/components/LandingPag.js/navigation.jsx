import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from '../../assets/images/logo.png'
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { log_out } from "../../Redux/Actions/AuthActions";
import { BsBoxArrowRight, BsHouseDoor } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";

const Navigation = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const Auth = useSelector((state) => state.AuthReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home"><img src={logo} style={{width:"100px", heigth:"100px"}}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
       
             
               <Nav.Link href="/" className="page-scroll">
               Acceuil
              </Nav.Link>
          
            </Nav>
            <Nav>
            
            <Nav.Link href="/panier" className="page-scroll">
                <FaCartPlus />
                </Nav.Link>
          

            {Auth.isAuth  ? (
            
                
                  <Nav.Link
                    onClick={() => {
                      dispatch(log_out());
                    }}
                  >
                    <BsBoxArrowRight />
                  </Nav.Link>
                
              
            ) : (
              <>
              
                  <Nav.Link href="/signUp">Enregistrement</Nav.Link>
                
                
                  <Nav.Link href="/Login">se connecter</Nav.Link>
                
              </>
            )}
           {/*  {Auth.isAuth  ?  (
              (user.isAdmin ) ? (
              
                  
                    <Nav.Link href="/admin">Admin</Nav.Link>
                  
                
              ) : null
            ) : null}
           */}
        </Nav>
        </Navbar.Collapse>
</Navbar>
  );
};
export default Navigation;
