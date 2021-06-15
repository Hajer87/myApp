import React, { useEffect, useState } from "react";
import AllCategories from "./AllCategories";
import AdminNav from '../AdminNav/AdminNav'
import { getCategories } from "../../../Redux/Actions/categoryActions";
import { getIngredients } from "../../../Redux/Actions/ingredientActions";
import { getOrders } from "../../../Redux/Actions/Orders/order";
import { useDispatch } from "react-redux";
import ModalAddIngredient from "./ModalAddIngredient";
import ModalAddCategory from "./ModalAddCategory";
import getUsers  from "../../../Redux/Actions/usersAction";

const Categories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
    dispatch(getOrders());
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <div>
      <AdminNav/>
      <div  style={{marginTop:"50px"}}>
      <h2>Gestion des catégories et des ingrédients</h2>
    <div >
      <AllCategories />
      </div> 
      <div style={{display:"grid", gridTemplateRows:"80% 20%"}}>
            <ModalAddCategory />
           <ModalAddIngredient />
           </div>
           </div>  
    </div>
  );
};

export default Categories;
