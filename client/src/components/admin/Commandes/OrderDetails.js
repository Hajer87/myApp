import React from "react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import '../../../assets/style/orderDetails.css'
import { getOrders } from "../../../Redux/Actions/Orders/order";
const OrderDetails = ({order, key}) => {
  
const dispatch=useDispatch()

const ingredients=useSelector(state=>state.ingredientReducer.ingredients)
const array= order.commandes.map((cmd)=>cmd.map((id)=>(ingredients.find((el)=>el._id===id))))
console.log(array)

return (

    <>
     <ol className="gradient-list">
   
  {array.map((el)=>
 <li>
 {el.map((x)=><li>{x.name}</li>)}
 </li>)}
       
   
     

</ol>


   </>
  );
};





export default OrderDetails;





