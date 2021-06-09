
import React, { useEffect, useState } from "react";
import { Button ,Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../Redux/Actions/categoryActions";
import {getIngredients, 
  createIngredient,
} from "../../Redux/Actions/ingredientActions";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddIngredient() {
  const [open, setOpen] = React.useState(false);
  const [image, setImage]=useState(null)
  const [data, setData] = useState({
      name:'',
      description:'',
      price:'',
      category:''
    });
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
    setData({ ...data, [e.target.name]: e.target.value });
    
  };
  const handleChangeCategory=(e)=>{
    setData({...data, category: (categories.find((cat)=>cat.name===e.target.value))._id })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createIngredient(data, image)); 
    dispatch(getIngredients())
    setOpen(false)
  };
  
 
  return (
    <div>
        
      <Button  variant="secondary" size="lg" block onClick={handleClickOpen}>
Ajouter un ingredient
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
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


