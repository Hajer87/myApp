import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Navigation from "../LandingPag.js/navigation";
import { Button, DropdownButton, Form, Table } from "react-bootstrap";
import OrderDetails from "./OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../../Redux/Actions/Orders/order";
import { getCategories } from "../../Redux/Actions/categoryActions";
import { getIngredients } from "../../Redux/Actions/ingredientActions";
import getUsers from "../../Redux/Actions/usersAction";
import ButtonStatus from "./ButtonStatus";

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

function Commandes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
    dispatch(getOrders());
    dispatch(getUsers());
  }, [dispatch]);

   const orders = useSelector((state) => state.OrdersReducer.orders); 
   const handleDelete=(id)=>{
  dispatch(deleteOrder(id))
   }
  /* const orders=JSON.parse(localStorage.getItem('orders')) */
  return (
    <>
      <Navigation />

      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Commandes</th>
            <th>Date de livraison</th>
            <th>heure</th>
            <th>livraison</th>
            <th>address</th>
            <th>total</th>
            <th>status</th>
            {/* <th>created_at</th> */}
           
          </tr>
        </thead>
        <tbody>
          {orders
            ? orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    {order.user.firstname} {order.user.lastname}
                  </td>

                  <td>
                    <OrderDetails key={index} order={order} />
                  </td>

                  <td>{order.date}</td>
                  <td>{order.heure}</td>
                  <td>{order.livraison}</td>
                  <td>{order.address}</td>
                  <td>{order.total} DT</td>
                  <td><ButtonStatus stat={order.delivred} id={order._id}/></td> 

                 
                  <td>
                    <Button onClick={()=>handleDelete(order._id)} variant="light" className="btn-sm">
                      supprimer
                    </Button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </>
  );
}
export default Commandes;
