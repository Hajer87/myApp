import React, { useEffect, useState } from "react";
import { Button ,Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../Redux/Actions/categoryActions";
import {getIngredients, 
  createIngredient,
  updateIngredient,
} from "../../Redux/Actions/ingredientActions";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { VscZoomIn } from "react-icons/vsc";

 function EditIngredient({ingredient}) {
  const [open, setOpen] = React.useState(false);
  const [image, setImage]=useState(null)
  const [info, setInfo] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
  }, [dispatch]);


  const categories = useSelector((state) => state.categoryReducer.categories);


  const selectImageToUpload=(e)=>{
    setImage(e.target.files[0]);
  }

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
    
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateIngredient(ingredient._id,info, image )); 
    setTimeout(() => {
      dispatch(getIngredients())                 
          }, 2000);
    setOpen(false)
  };
  
 
  return (
    <div>
        
      
      <VscZoomIn onClick={handleClickOpen} />
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            name="name"
            id="name"
            label="name"
            type="text"
            
            onChange={handleChange}
            fullWidth
          />


 <TextField
            autoFocus
            name="description"
            margin="dense"
            id="description"
            label="description"
            type="text"
            
            onChange={handleChange}
            fullWidth
          />


<TextField
            autoFocus
            name="price"
            margin="dense"
            id="name"
            label="prix"
            type="Number"
            
            onChange={handleChange}
            fullWidth
          />

<Form.Control
              as="select"
              name="category"
              defaultValue="category"
              value={ingredient.category}
              onChange={handleChange}

            >
              
              {categories
                ? categories.map((el) => <>
               <option value={el._id}>{el.name}</option></>)
                : null}
            </Form.Control>

           
          <Form.File
          type="file"
            name="image"
            id="image"
            label="upload image"
           
            onChange={selectImageToUpload}
          /> 

        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
           enregister
          </Button>
          <Button onClick={handleClose} color="primary">
            sortir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
 export default EditIngredient

