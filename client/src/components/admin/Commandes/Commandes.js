import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Button, Table } from "react-bootstrap";
import OrderDetails from "./OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  getOrders,
  updateOrders,
} from "../../../Redux/Actions/Orders/order";
import { getCategories } from "../../../Redux/Actions/categoryActions";
import { getIngredients } from "../../../Redux/Actions/ingredientActions";
import getUsers from "../../../Redux/Actions/usersAction";
import Loading from "../../Loading";
import AdminNav from "../AdminNav/AdminNav";
import NotDelivredOrder from "./NotDelivredOrder";
import { Link } from "react-router-dom";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));



  const Commandes = () => {
    const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getCategories())
    dispatch(getIngredients())
    dispatch(getOrders())
    dispatch(getUsers())
   
  }, [dispatch])
  
  const orders = useSelector((state)=>state.OrdersReducer)
  console.log(orders)
    const handleDelete = (id) => {
      dispatch(deleteOrder(id));
    };
 
    
  return (
    orders.isLoading ?
    <Loading/>
    :(
    <div>
        <AdminNav/>
        <Link to="/admin/commandes/historique"><button className="btn" >historique des commandes terminées</button></Link> 
     <h2>Les commandes en cours</h2>
<NotDelivredOrder orders={orders} />

    </div>
  ))
}

export default Commandes


 