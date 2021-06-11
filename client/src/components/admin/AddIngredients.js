
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
import './upload.css'

export default function AddIngredient() {
  const [open, setOpen] = React.useState(false);
  const [image, setImage]=useState(null)
  const [data, setData] = useState({
      name:null,
      description:null,
      price:null,
      category:null
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createIngredient(data, image));
     setTimeout(() => {
      dispatch(getIngredients())
      setOpen(false)
    }, 2000);  
    
     
  };
  
 
  return (
    <div>
        
      <Button  variant="secondary" size="lg" block onClick={handleClickOpen}>
Ajouter un ingredient
      </Button>
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
            id="price"
            label="prix"
            type="Number"
            onChange={handleChange}
            fullWidth
            required
          />

<Form.Control
              as="select"
              name="category"
              defaultValue="category"
              onChange={handleChange}
              placeholder='choisissez votre mode de livraison'
              required

            >
              {categories
                ? categories.map((el) => <>
               <option value={el._id}>{el.name}</option></>)
                : null}
            </Form.Control>

           
         {/*  <Form.File
          type="file"
            name="image"
            id="image"
            label="upload image"
            required
            onChange={selectImageToUpload}
          /> */}

<div class='file file--upload'>
      <label for='input-file'>
        <i class="material-icons">cloud_upload</i>Upload
      </label>
      <input id='input-file' type='file'required
            onChange={selectImageToUpload}  />
    </div>

        </DialogContent>
        <DialogActions>
          {((data.name) && (data.price) &&(data.category) && image)?
          <Button onClick={handleSubmit} color="primary">
           enregister
          </Button>
          
          : null}
          <Button onClick={handleClose} color="primary">
            annuler
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}


