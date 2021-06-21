import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  deleteCategory,
  getCategories,
} from "../../../Redux/Actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import { VscClose, VscZoomIn } from "react-icons/vsc";
import {
  deleteIngredient,

  getIngredients,
} from "../../../Redux/Actions/ingredientActions";
import EditIngredient from "./EditIngredient";
import EditCategory from "./EditCaregory";
import Loading from "../../Loading";
import { Table } from "react-bootstrap";
import '../../../assets/style/Tab.css'
import ModalImage from "./ModalImage";
import ModalImageIngredient from "./ModalImageIngredient";

export default function AllCategories() {
 
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoryReducer.categories);
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
  }, [dispatch]);
  const deleteHandler = (id) => {
    dispatch(deleteIngredient(id));
    /*   window.location.reload();
     */
  };
  const deleteHandlerCat = (id) => {
    dispatch(deleteCategory(id));
    /*     window.location.reload();
     */
  };

  return !categories ? (
    <Loading />
  ) : (
    <Table striped bordered hover responsive className="table-sm">
      {console.log('render')}
      <thead>
        <tr>
          {categories.map((cat) => (
            <th >
              <ModalImage cat={cat} />{" "}

              <EditCategory id={cat._id} img={cat.image} nom={cat.name} />
              <VscClose onClick={() => deleteHandlerCat(cat._id)} />{" "}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {categories.map((cat) => (
          <td>
            {cat.ingredient.map((el) => (
              <li>
               <ModalImageIngredient el={el}/>
              
                <EditIngredient ingredient={el} />
                <VscClose onClick={() => deleteHandler(el._id)} />{" "}
                
              </li>
            ))}
          </td>
        ))}
      </tbody>
    </Table>
  );
}
/* <div className={classes.root}>
<Tabs
  orientation="vertical"
  variant="scrollable"
  value={value}
  onChange={handleChange}
  aria-label="Vertical tabs example"
  className={classes.tabs}
>
  {categories.map((category, index)=>
  <Tab label={category.name}{...a11yProps(index)}  >
    </Tab>)}
</Tabs>

{(categories)? categories.map((category, index)=>
 <TabPanel value={value} index={index}>
    <EditCategory id={category._id} img={category.image} nom={category.name}/> 
    <VscClose onClick={()=>deleteHandlerCat(category._id)}/> 
{category.ingredient.map((el)=>
<div style={{display:"grid", gridTemplateColumns:"80% 10% 10%", letterSpacing:'10px'}}>
<h2>{el.name}</h2>
<EditIngredient ingredient={el}/> 
<VscClose onClick={()=>deleteHandler(el._id)}/> 
</div>)}
</TabPanel> 
      )
:null}
</div> */
