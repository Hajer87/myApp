/* import React, { useState } from 'react'
import { Container, Form, Col, Card, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { createCategory } from '../../Redux/Actions/categoryActions'

const AddCategory = ({setOpen}) => {

const dispatch=useDispatch()

const [file, setFile]=useState(null)
const [info, setInfo]=useState({
name:""
})
const handleChange = (e) => {
setInfo({ ...info, [e.target.name]: e.target.value })
}
const selectImageToUpload=(e)=>{
setFile(e.target.files[0].name)
}

const handleSubmit = (e) => {
e.preventDefault()
/* dispatch(createCategory(info, file))
                        
                       

return (
<div>  
<h1>AddCategory</h1>  
<Container>

<Card>
  <Card.Header>Add Category</Card.Header>
  <Card.Body>
    
    <Card.Text>
    
  <Form.Control size="lg" type="text" placeholder="Category" onChange={handleChange} /> 

  <Form.File id="exampleFormControlFile1" label="" onChange={selectImageToUpload} /> 

    </Card.Text>
    <Button  onClick={setOpen(false)} variant="primary">valider</Button>
  </Card.Body>
</Card>

                         

  </Container>                    
</div>
)
}

export default AddCategory */

import React from "react";
import { Button, Form } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, getCategories } from '../../Redux/Actions/categoryActions'

import axios from "axios";

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
          <DialogContentText>Ajouter le nom de la catégory</DialogContentText>
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
            Cancel
          </Button>
          <Button onClick={submitHandler} color="primary">
           Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}