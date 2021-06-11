import { Divider } from "@material-ui/core";
import React from "react";

import { useSelector } from "react-redux";
import './orderDetails.css'
const OrderDetails = ({order, key}) => {
  

const ingredient=useSelector(state=>state.ingredientReducer.ingredients)
const array= order.commandes.map((cmd)=>cmd.map((el)=>ingredient.find((e)=>e._id===el) ))
console.log(array)

  


return (

    <>
     <ol className="gradient-list">
    {array.map((cmd, key)=>
   
    
 <li>
 {cmd.map((el)=><li>{el.name}</li>)}
 
 </li>
 
    
   
      )}

</ol>


   </>
  );
};





export default OrderDetails;





