import React, { useEffect, useState } from "react";
import { TabContainer, Table } from "react-bootstrap";
import OrderDetails from "./OrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  getOrders,
  updateOrders,
} from "../../../Redux/Actions/Orders/order";
import AdminNav from "../AdminNav/AdminNav";
import '../../../assets/style/Tab.css'



const DelivredOrder = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state)=>state.OrdersReducer)

  /* useEffect(() => {
    dispatch(getOrders());
    dispatch(getCategories());
    dispatch(getIngredients());
   
    dispatch(getUsers());
  }, [dispatch]); */


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
const array=orders.orders

const handleSubmit=(e)=>{
  e.preventDefault();
}    

  return (
    <div>
   
   <AdminNav/>       
        <TabContainer>      
      <Table  striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
           
            <th>
              User
              <br />
              <input onSubmit={handleSubmit} placeholder='chercher un utilisateur' type="text" onChange={handleChangeUserInput}></input>
            </th>
            <th>email</th>
            <th id="smallCell">created_at</th>
            <th>Commandes</th>
            <th>
              Date de livraison
             <br/>
             <input onSubmit={handleSubmit} placeholder='chercher une date' value={dateSearch} onChange={dateHandler}></input>
            </th>
            <th  id="smallCell">heure de livraison</th>

            <th>livraison</th>
            <th>address</th>
            <th>Numéro de téléphone</th>
            <th >total</th>
            <th>date de livraison</th>
          </tr>
        </thead>
        <tbody>
          {orders.orders 
            ? orders.orders

                .filter((order) => order.isDelivered === true )
                .filter((order)=>order.date.includes(dateSearch))
                .filter((order)=>order.user.firstname.toUpperCase().includes(userInput.toUpperCase()) || order.user.lastname.toUpperCase().includes(userInput.toUpperCase()) || order.user.email.toUpperCase().includes(userInput.toUpperCase()))

                .map((order, index) =>
                
                    <tr key={order._id}>
                    

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
                      <td>
                      {order.deliveredAt.substring(0, 10)}
                      </td>
                    </tr>
                    
                 
                )
            : null}
        </tbody>
      </Table>
      </TabContainer>
    </div>
  );
};

export default DelivredOrder;
