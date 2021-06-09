import React from "react";

import { useDispatch } from "react-redux";
import {  updateOrders } from "../../Redux/Actions/Orders/order";
import { Button } from "react-bootstrap";

const ButtonStatus = ({stat, id}) => {
                         const dispatch=useDispatch()
  console.log(stat)
  console.log(id)
  
  return (
    <div>

      <Button onClick={dispatch(updateOrders({ stat}))}>{stat}</Button>
    </div>
  );
};

export default ButtonStatus;
 