import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from '../../assets/images/logo.png'
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { log_out } from "../../Redux/Actions/AuthActions";
import { BsBoxArrowRight, BsHouseDoor } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import '../../assets/style/navigation.css'

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
       
             
               <Nav.Link className="btnNav"  href="/" /* className="page-scroll" */>
               <span>Acceuil</span>
              </Nav.Link>
          
            </Nav>
            <Nav>
            
            <Nav.Link className="btnNav"  href="/panier" >
               {/*  <FaCartPlus /> */}
              
   <span>
        Panier
        
        </span>
       {/*  <span class="count">{props.count}</span> */}
                </Nav.Link>
          

            {Auth.isAuth  ? (
            <>
            <Nav.Link className="btnNav"  href="/profile"> <span>Mon Profile</span></Nav.Link>
                
                  <Nav.Link className="btnNav" 
                    onClick={() => {
                      dispatch(log_out());
                    }}
                  >
                    <BsBoxArrowRight />
                  </Nav.Link>
                </>
              
            ) : (
              <>
              
                  <Nav.Link className="btnNav"  href="/signUp"><span>Enregistrement</span></Nav.Link>
                
                
                  <Nav.Link  className="btnNav" href="/Login"><span>se connecter</span></Nav.Link>
                
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
