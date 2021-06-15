import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Loading from '../Loading'
import { getCategories } from '../../Redux/Actions/categoryActions'
import CategoryCard from './categoryCard'
import '../../assets/style/category.css'

import { CardActionArea, CardActions, CardContent, Typography } from '@material-ui/core'
import { FcDownload } from "react-icons/fc";
import { getIngredients } from '../../Redux/Actions/ingredientActions'



const CategoryList = ({setOpen, open, setData, data}) => {
  
const dispatch = useDispatch()
  useEffect(() => {
   dispatch (getCategories())
   dispatch(getIngredients())
  }, [dispatch]) 

  const liste=useSelector(state=>state.categoryReducer)
  const {isLoading}=liste
  return isLoading ? (
    <Loading/>
  ) :(
    <>
    <div id='commande'>
<h2>Choississez la composition de votre bol</h2>
    < div  className="list">
     {(liste.categories)? liste.categories.map((category)=><CategoryCard  key={category._id} category={category} setOpen={setOpen} open={open} setData={setData} data={data}/>): null}
     <CardActions  >
        <CardActionArea>
         
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
             
              <a  href="#myBol"><FcDownload/></a>
           
             
            </Typography>
          </CardContent>
        </CardActionArea>
      </CardActions>
  </ div>
  
  </div>
     
  </>
   )
}

export default CategoryList
