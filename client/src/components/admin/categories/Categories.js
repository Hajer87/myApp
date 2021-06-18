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
import { Col, Container, Row } from "react-bootstrap";

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
      <Container style={{marginTop:"50px"}}>
      <h2>Gestion des catégories et des ingrédients</h2>
    <div>
      <AllCategories />
      </div>
      <Container>
      <Row >
        <Col>
            <ModalAddCategory />
            </Col>
            <Col>
           <ModalAddIngredient />
           </Col>
           </Row>
           </Container> 
           </Container>  
    </div>
  );
};

export default Categories;
