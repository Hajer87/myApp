import { Route , Switch} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

import Home from './components/Home'
import SignUp from "./components/Authentification/SignUp";
import Login from './components/Authentification/Login'
import Checkout from './components/order/Checkout'
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./components/admin/Dashbord";
import Categories from "./components/admin/Categories";
import Commandes from "./components/admin/Commandes";
import Panier from "./components/order/Panier";
import UsersList from "./components/admin/UsersList";


function App() {
  
    return (
    <div >
  <Switch> 
    <Route exact path="/" component={Home} />
    <Route  path="/signUp" component={SignUp} />
    <Route path="/login" component={Login} />
    <Route path="/panier" component={Panier} />

    <Route path='/checkout' component={Checkout}/>



    <Route exact path="/admin" component={Dashboard}/>
    <Route path="/admin/commandes" component={Commandes}/>
    <Route path="/admin/productlist" component={Categories}/>
    <Route path="/admin/userlist" component={UsersList}/>

  </Switch>


    </div>
    
  );
}

export default App;
