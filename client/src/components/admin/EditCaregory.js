
import React from "react";
import { Button, Form } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, getCategories, updateCategory } from '../../Redux/Actions/categoryActions'

import axios from "axios";
import { VscZoomIn } from "react-icons/vsc";

export default function EditCategory({id}) {
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = React.useState('');
  const [image, setImage] = React.useState("");
  const dispatch = useDispatch();
  const categories=useSelector(state=>state.categoryReducer.categories)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uploadFileHandler = async (e) => {
    setImage(e.target.files[0])
   
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateCategory(id, info, image));
    dispatch(getCategories())
   
    setOpen(false)
  };
  const changeHandler = (e) => setInfo(e.target.value );


  return (
    <div>
      <VscZoomIn onClick={handleClickOpen}/>
      
      <Dialog 
        open={open}
        onClose={handleClose}
        aria-labelledby="ajout category"
        onSubmit={submitHandler}
      >
       
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            id="name"
            
            label="Nom de la category"
            type="text"
            fullWidth
            onChange={changeHandler}
          />

          <Form.Group controlId="formFileSm" className="mb-3">
            <Form.Control type="file" size="sm" name="image" onChange={uploadFileHandler} />
          </Form.Group>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={submitHandler} color="primary">
           Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}