
 import { Nav, NavDropdown } from 'react-bootstrap';
import {Link, useHistory} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { log_out } from "../../Redux/Actions/AuthActions";


 const Navigation = (props) => {
  const dispatch = useDispatch()
  const history=useHistory()
   const Auth=useSelector(state=>state.AuthReducer)
   const user=JSON.parse(localStorage.getItem('user'))
  return (
    <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
      <div className='container'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
           
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav  navbar-right'>
         
            <li>
              <a href='/' className='page-scroll'>
                Accueil
              </a>
            </li>
            <li>
              <a href='/panier' className='page-scroll'>
                Panier
              </a>
            </li>
            
            {(Auth.isAuth)?(
            <>
            <li><a href='/profile'>My Profile</a></li>
          <li><Nav.Link onClick={()=>{dispatch(log_out())}} >Log out</Nav.Link></li>
          </>) :
           (<> 
          <li><a href='/signUp'>SignUp</a></li>
          <li><a href="/Login">Login</a></li> 
           </>)}
           { (user)?
           (user.isAdmin) ?
           <>
           <li>
               
                  <a href="/admin">
                    Dashbord
                  </a>
                  </li>
                  <li>
                  <a href="/admin/userlist">
                    Users
                  </a>
                  </li>
                  <li>
                  <a href= "/admin/productlist">
                   Products
                  </a>
                  </li>
                  <li>
                  <a href="/admin/commandes">
                    Orders
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

