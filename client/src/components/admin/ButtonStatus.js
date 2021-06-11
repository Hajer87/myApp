import React, { useState } from "react";

import { useDispatch } from "react-redux";
import {  updateOrders } from "../../Redux/Actions/Orders/order";
import { Button } from "react-bootstrap";

const ButtonStatus = ({stat, id}) => {
                         const dispatch=useDispatch()
                         const [status, setStatus]=useState({
                           delivred: stat
                         })

  
  return (
    <div>

      <Button onClick={()=>dispatch(updateOrders({_id:id, status}))}>{stat}</Button>
    </div>
  );
};

export default ButtonStatus;
 