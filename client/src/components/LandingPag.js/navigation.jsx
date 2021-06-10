
 import { Nav, NavDropdown } from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { log_out } from "../../Redux/Actions/AuthActions";
import { BsBoxArrowRight, BsHouseDoor } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";

 const Navigation = (props) => {
  const dispatch = useDispatch()
  const history=useHistory()
   const Auth=useSelector(state=>state.AuthReducer)
   const user=JSON.parse(localStorage.getItem('user'))
  return (
    <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
      <div className='container'>
       {/*  <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
           
        </div> */}

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav  navbar-right'>
         
            <li>
              <a href='/' className='page-scroll'>
              <BsHouseDoor/>
              </a>
            </li>
            <li>
              <a href='/panier' className='page-scroll'>
               <FaCartPlus/>
              </a>
            </li>
            
            {(Auth.isAuth)?(
            <>
            
          <li><Nav.Link onClick={()=>{dispatch(log_out())}} ><BsBoxArrowRight/></Nav.Link></li>
          </>) :
           (<> 
          <li><a href='/signUp'>Déjà inscrit?</a></li>
          <li><a href="/Login">se connecter</a></li> 
           </>)}
           { (user)?
           (user.isAdmin) ?
           <>
           <li>
               
                  <a href="/admin">
                    Dashbord
                  </a>
                  </li>
                
                  
                
          </>
          : null
        :null} 
           
              
          </ul>
        </div>
      </div>
    </nav>
  )
  }
export default Navigation 

