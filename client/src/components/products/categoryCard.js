import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {getIngredients} from "../../Redux/Actions/ingredientActions";
import '../../assets/style/category.css'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  }
})

export default function CategoryCard ({category, open , setOpen,  setData, data }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(getIngredients())
  }, [dispatch])
  const image = category.image
  const handleClick=()=>{
    setOpen(true);
    setData(category);
  }
  return (
    < div className='cardd'>
  
      <Card  className={classes.root}>
        <CardActionArea>
          <CardMedia
            component='img'
            alt='category'
            height='140'
            image={image}
            title='Category' />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
             
              <button  style={{background: "transparent", border: "none" }}onClick={handleClick}><a  href="#ingredients">{category.name}</a></button>
           
             
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      
    
      </div>
  )
}
