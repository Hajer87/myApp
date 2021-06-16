
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

const DelivredOrder = ({order}) => {
                         const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getCategories());
    dispatch(getIngredients());
   
    dispatch(getUsers());
  }, [dispatch]); 

  const orders = useSelector((state) => state.OrdersReducer.orders);
  const handleDelete = (id) => {
    dispatch(deleteOrder(id));
  };
const [date, setDate]=useState('')
const dateHandler=(e)=>{
  setDate(e.target.value)
}
  return (
  <div>
    <h2>Les commandes terminées</h2>
  <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>created_at</th>
            <th>Commandes</th>
            <th>Date de livraison
              <input onChange={dateHandler}></input>
            </th>
            <th>livraison</th>
            <th>address</th>
            <th>Numéro de téléphone</th>
            <th>total</th>
            <th>status</th>
            <th>delivred_at</th>
          </tr>
        </thead>
                <tbody>
          {orders
            ? orders.filter((order)=>order.isDelivered===true)
            .map((order, index) => (
              !order.isDelelvred?
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user.firstname} {order.user.lastname}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td><OrderDetails key={index} order={order} /></td> 
                  <td>{order.date}</td>
                  <td>{order.livraison}</td>
                  <td>{order.user.ville} {order.user.City} {order.user.codePostal}</td>
                  <td>{order.user.phoneNumber}</td>
                  <td>{order.total} DT</td>
                  <td> <Button onClick={() => dispatch(updateOrders(order._id))}>valider</Button>
                      
                   
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i
                        className="fas fa-times"
                        style={{ color: "red" }}
                        onClick={() => dispatch(updateOrders(order._id))}
                      />
                    )}
                  </td>
                  {order.isDelivered ? (
                    <td>
                      <Button
                        onClick={() => handleDelete(order._id)}
                        variant="light"
                        className="btn-sm"
                      >
                        supprimer
                      </Button>
                    </td>
                  ) : null}
                </tr>
                :null
              ))
            : null} 
        </tbody>
      </Table> 
       
  </div>
  )
};

export default DelivredOrder;
