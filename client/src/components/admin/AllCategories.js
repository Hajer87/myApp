import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { getCategories } from '../../Redux/Actions/categoryActions';
import { useDispatch, useSelector } from 'react-redux';
import { VscClose, VscZoomIn } from 'react-icons/vsc' 
import { deleteIngredient, getIngredient, getIngredients } from '../../Redux/Actions/ingredientActions';
import EditIngredient from './EditIngredient';
import EditCategory from './EditCaregory';

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
    height: 224,
   
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
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
        
  }, [dispatch])
  const categories=useSelector(state=>state.categoryReducer.categories)
  const deleteHandler=(id)=>{
  dispatch(deleteIngredient(id))
  dispatch(getIngredients())
  }
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
           {(categories)? categories.map((category, index)=> 
           <>
        <Tab label={category.name} {...a11yProps(index)} />
        <EditCategory id={category._id} img={category.image}/>
        </>
        ):null}
        
      </Tabs>
      {(categories)? categories.map((category, index)=>
      <TabPanel value={value} index={index}>
            
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
