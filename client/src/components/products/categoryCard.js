import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getIngredients} from "../../Redux/Actions/ingredientActions";
import '../../assets/style/category.css'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  }
})

export default function CategoryCard ({category, open , setOpen,  setData, data }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const auth=useSelector(state=>state.AuthReducer.isAuth)
  const history=useHistory()
  useEffect(() => {

    dispatch(getIngredients())
  }, [dispatch])
  const image = category.image
  const handleClick=()=>{
    if(auth)
    {setOpen(true);
    setData(category);}
    else 
    history.push('/login')
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
            <a  href="#ingredients">
              <button  style={{background: "transparent", border: "none" }}onClick={handleClick}>{category.name}</button>
              </a>
             
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      
    
      </div>
  )
}
