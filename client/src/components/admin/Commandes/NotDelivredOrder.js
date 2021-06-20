import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Button, Container, Table } from "react-bootstrap";
import OrderDetails from "./OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  getOrders,
  updateOrders,
} from "../../../Redux/Actions/Orders/order";
import orderReducer from "../../../Redux/Reducer/order/orderReducer";

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

const NotDelivredOrder = ({orders}) => {
  const dispatch = useDispatch();

  /* useEffect(() => {
    dispatch(getOrders());
    dispatch(getCategories());
    dispatch(getIngredients());
   
    dispatch(getUsers());
  }, [dispatch]); */

  
  const handleDelete = (id) => {
    dispatch(deleteOrder(id));
  };
  const handleUpdate = (id) => {
    dispatch(updateOrders(id));
    setTimeout(() => {
      dispatch(getOrders());
    }, 2000);
  };

  const [userInput, setUserInput] = useState("");
  const handleChangeUserInput = (e) => {
    setUserInput(e.target.value);
  };
  const [dateSearch, setDateSearch] = useState("");
  const dateHandler = (e) => {
    setDateSearch(e.target.value);
  };



  return (
    <div>
   
              
              
      <Table id="myTable" striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th >ID</th>
            <th>
              User
              <br />
              <input placeholder='chercher un utilisateur' type="text" onChange={handleChangeUserInput}></input>
            </th>
            <th>email</th>
            <th>created_at</th>
            <th>Commandes</th>
            <th>
              Date de livraison
             <br/>
             <input placeholder='chercher une date' value={dateSearch} onChange={dateHandler}></input>
            </th>
            <th>heure de livraison</th>

            <th>livraison</th>
            <th>address</th>
            <th>Numéro de téléphone</th>
            <th>total</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {orders.orders 
            ? orders.orders

            .filter((order) => order.isDelivered === false )

                .filter((order)=>order.date.includes(dateSearch))
                .filter((order)=>order.user.firstname.toUpperCase().includes(userInput.toUpperCase()) || order.user.lastname.toUpperCase().includes(userInput.toUpperCase()) || order.user.email.toUpperCase().includes(userInput.toUpperCase()))

                .map((order, index) =>
                
                    <tr key={order._id}>
                      <td>{order._id}</td>

                      <td>
                        {order.user.firstname} {order.user.lastname}
                      </td>
                      <td><a href={`mailto:${order.user.email}`}>{order.user.email}</a></td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>
                        <OrderDetails key={index} order={order} />
                      </td>
                      <td>{order.date}</td>
                      <td>{order.heure}</td>
                      <td>{order.livraison}</td>
                      <td>
                        {order.user.ville} {order.user.City}{" "}
                        {order.user.codePostal}
                      </td>

                      <td>{order.user.phoneNumber}</td>
                      <td>{order.total} DT</td>
                      <td> {order.isDelivered}</td>
                      <td>
                     
                        <Button
                          onClick={() => dispatch(updateOrders(order._id))}
                        >
                         
                          terminée
                        </Button>
                      </td>
                    </tr>
                    
                 
                )
            : null}
        </tbody>
      </Table>
    </div>
  );
};

export default NotDelivredOrder;
