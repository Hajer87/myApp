import React from "react";

import { useDispatch, useSelector } from "react-redux";
import '../../../assets/style/orderDetails.css'
const OrderDetails = ({order, key}) => {
  
const dispatch=useDispatch()

const ingredients=useSelector(state=>state.ingredientReducer.ingredients)


return (

    <>
     <ol className="gradient-list">
   
  {
  ingredients ?
  order.commandes.map((cmd)=>cmd.map((id)=>(ingredients.find((el)=>el._id===id)))).map((el)=>
 <li>
 {el.map((x)=><li>{x.name}</li>)}
 </li>)
 :null}
       
   
     

</ol>


   </>
  );
};





export default OrderDetails;





