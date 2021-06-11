import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { useDispatch, useSelector } from 'react-redux';
import { addToBol, deleteFromBol } from '../../Redux/Actions/Orders/content';
import '../../assets/style/ingredients.css'
import { BsTrash } from 'react-icons/bs';

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  }
})


export default function IngCard ({ingredient, cart, setCart}) {
  //style
  const classes = useStyles()
  //dispatch & handleclick functions
  const dispatch = useDispatch()
  const addIngredient=(ingredient)=>{
    dispatch (addToBol(ingredient))
   
 }
 const deleteIngredient=()=>{
   dispatch(deleteFromBol(ingredient._id))
 }
  const handleClickAdd=()=>{
    
    addIngredient(ingredient); 
    setCart(true);
  }
  
  const image= ingredient.image
  const content= useSelector(state =>state.contentReducer.content)
 const tab=content.filter((el)=>el.category===ingredient.category)
return(

<div className='cardd'>
  <Card className={classes.root}>
  <CardActionArea>
    <CardMedia
      component='img'
      alt={ingredient.name}
      height='140'
      image={image}
      title={ingredient.name} />
    <CardContent>
      <Typography gutterBottom variant='h5' component='h2'>
        
        
      {

!(tab.length==1)?
!(content.includes(ingredient))?
//button add
<a href="#commande"><button style={{background: "transparent", border: "none" }} onClick={()=>{handleClickAdd(ingredient)}}> {ingredient.name}</button></a>
       //button delete
      : (<button style={{background: "transparent", border: "none" }} onClick={()=>deleteIngredient(ingredient)}><BsTrash/></button>)
    :null
}
        
        
        
        
       
      </Typography>
    </CardContent>
  </CardActionArea>
</Card>



      
</div>

)
}