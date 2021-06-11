import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

import Home from "./components/Home";
import SignUp from "./components/Authentification/SignUp";
import Login from "./components/Authentification/Login";
import Checkout from "./components/order/Checkout";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./components/admin/Dashbord";
import Categories from "./components/admin/Categories";
import Commandes from "./components/admin/Commandes";
import Panier from "./components/order/Panier";
import UsersList from "./components/admin/UsersList";
import Bar from "./components/LandingPag.js/bar/Bar";

function App() {
  return (
    <div>
      <Bar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/panier" component={Panier} />
        <PrivateRoute path="/checkout" component={Checkout} />
        //admin
        <PrivateRoute exact path="/admin" component={Dashboard} />
        <PrivateRoute path="/admin/commandes" component={Commandes} />
        <PrivateRoute exact path="/admin/productlist" component={Categories} />
        <PrivateRoute path="/admin/userlist" component={UsersList} />
      </Switch>
    </div>
  );
}

export default App;
