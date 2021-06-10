

import React from "react";
import { Button, Form } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, getCategories } from '../../Redux/Actions/categoryActions'



export default function AddCategory() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("");
  const [upload, setUpload] = React.useState(false);
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
    dispatch(createCategory(name, image));
    dispatch(getCategories())
   
    setOpen(false)
  };
  const changeHandler = (e) => setName(e.target.value );


  return (
    <div>
      <Button variant="primary" size="lg" block onClick={handleClickOpen}>
        Ajouter une catégory
      </Button>
      <Dialog 
        open={open}
        onClose={handleClose}
        aria-labelledby="ajout category"
        onSubmit={submitHandler}
      >
        <DialogTitle id="form-dialog-title">Ajouter une category</DialogTitle>
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
