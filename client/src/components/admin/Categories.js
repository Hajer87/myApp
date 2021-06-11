import React, { useEffect, useState } from "react";
import AllCategories from "./AllCategories";
import AddCategory from "./AddCategory";
import Navigation from "../LandingPag.js/navigation";
import AddIngredient from "./AddIngredients";
import { getCategories } from "../../Redux/Actions/categoryActions";
import { getIngredients } from "../../Redux/Actions/ingredientActions";
import { getOrders } from "../../Redux/Actions/Orders/order";
import getUsers from "../../Redux/Actions/usersAction";
import { useDispatch } from "react-redux";
import ModalAdd from "./ModalAdd";
const Categories = () => {
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
    dispatch(getOrders());
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <div>
      <Navigation />

      <h2>Listes des categories</h2>
      <AddCategory />
     {/*  <AddIngredient /> */}
<ModalAdd/>
      <AllCategories/>
      
    </div>
  );
};

export default Categories;
