import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { deleteCategory, getCategories } from '../../../Redux/Actions/categoryActions';
import { useDispatch, useSelector } from 'react-redux';
import { VscClose, VscZoomIn } from 'react-icons/vsc' 
import { deleteIngredient, getIngredient, getIngredients } from '../../../Redux/Actions/ingredientActions';
import EditIngredient from './EditIngredient';
import EditCategory from './EditCaregory';
import Loading from '../../Loading';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'grid',
    gridTemplateColumns: '30% 70%',
    height: 400,
    margin: 20
    
   
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    fontFamily: 'Dela Gothic One, cursive',
    fontSize: "xXLarge",
    letterSpacing: 3
  },
}));



export default function AllCategories() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch=useDispatch()
  useEffect(() => {
     dispatch(getCategories()) 
     dispatch(getIngredients()) 
        
  }, [])
  const categories=useSelector(state=>state.categoryReducer.categories)
  const deleteHandler=(id)=>{
  dispatch(deleteIngredient(id))
/*   window.location.reload();
 */  }
  const deleteHandlerCat=(id)=>{
    dispatch(deleteCategory(id))
/*     window.location.reload();
 */ 
  }
  
  return !categories ? (
    <Loading/>
  ) :(
  
   
<div className={classes.root}>
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
</div>




  );
} 


