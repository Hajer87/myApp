
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

const NotDelivredOrder = ({order}) => {
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
const handleUpdate=()=>{
  dispatch(updateOrders(order._id))
  setTimeout(() => {
    dispatch(getOrders())
  }, 2000);
}

const [userInput, setUserInput]=useState('')
const handleChangeUserInput=(e)=>{
  setUserInput(e.target.value)
}
const [dateSearch, setDateSearch]=useState(" ")
const dateHandler=(e)=>{
  setDateSearch(e.target.value)
}
  return (
  <div>
  <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>User<br/>
            <input type="text" onChange={handleChangeUserInput}></input>
            </th>
            <th>created_at</th>
            <th>Commandes</th>
            <th>Date de livraison
              <input value= {dateSearch} onChange={dateHandler}></input>
            </th>
            <th>heure de livraison</th>
            
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
            ? orders
            
            .filter((order)=>
            order.isDelivered===false 
            )
/*             .filter((order)=>order.date.includes(dateSearch)) 
 */            
            .map((order, index) => (
              !order.isDelelvred?
                <tr key={order._id}>
                  <td>{order._id}</td>
                  
                  <td>
                    {order.user.firstname} {order.user.lastname}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
               <td><OrderDetails key={index} order={order} /></td> 
                  <td>{order.date}</td>
                  <td>{order.heure}</td>
                  <td>{order.livraison}</td>
                  <td>{order.user.ville} {order.user.City} {order.user.codePostal}</td>
                  
                  <td>
                    {order.user.phoneNumber}
                    </td>
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
                        onClick={() =>handleUpdate}
                      />
                    )}
                  </td>
                  
                 
                </tr>
                :null
              ))
            : null} 
        </tbody>
      </Table>                   
  </div>
  )
};

export default NotDelivredOrder;
