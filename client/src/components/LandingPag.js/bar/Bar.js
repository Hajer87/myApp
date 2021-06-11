import React from "react";
import "./bar.css";
import logo from "../../../assets/images/x.jfif";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { FaCartPlus } from "react-icons/fa";
import { log_out } from "../../../Redux/Actions/AuthActions";
import { BsBoxArrowRight, BsHouseDoor } from "react-icons/bs";
import AdminButton from "../AdminButton";

const Bar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const Auth = useSelector((state) => state.AuthReducer);
  const user=localStorage.getItem("user")
  
  return (
    <div className="main-header">
      <div>
       
          <img className="logo" src={logo} />
          <a href="/">
           
            
            Acceuil</a>
          
              
      </div>

      <input type="checkbox" class="menu-btn" id="menu-btn" />
      <label for="menu-btn" class="menu-icon">
        <span className="menu-icon__line"></span>
      </label>

      <ul className="nav-links">
      
       
        <li className="nav-link">
          <a href="/panier">
            
            Panier
          </a>
        </li>
        {Auth.isAuth?
        <>
         { (Auth.user.isAdmin)?
         <li className="nav-link"><a href="/admin">Admin</a></li>
        :null}
         <li className="nav-link" className="name"> <a href="#">{Auth.user.firstname} {Auth.user.lastname}</a></li>
          <li className="nav-link">
            <a
              href="#"
              onClick={() => {
                dispatch(log_out());
              }}
            >
              {" "}
              <BsBoxArrowRight />
            </a>
          </li>
        
          </>
        : 
          <li>
            <li className="nav-link">
              <a href="/signUp">Enregistrer</a>
            </li>
            <li className="nav-link">
              <a href="/login">se connecter</a>
            </li>
          </li>
        }
       {/*  {Auth.isAuth ? 
           Auth.isAuth.user.isAdmin?
            <li>
              <a href="/admin">Admin</a>
            </li>
          
         : null
        :null}   */}
      </ul>
    </div>
  );
};

export default Bar;
