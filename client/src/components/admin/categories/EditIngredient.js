/* import React, { useEffect, useState } from "react";
import { Button ,Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../Redux/Actions/categoryActions";
import {getIngredients, 
  createIngredient,
  updateIngredient,
} from "../../../Redux/Actions/ingredientActions";
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
  const [info, setInfo] = useState(null);
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
           annuler
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
 export default EditIngredient

 */


 import React, { useEffect } from "react";
import { Modal } from "antd";
import { Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../Redux/Actions/categoryActions";
import {
  getIngredients, updateIngredient,
  
} from "../../../Redux/Actions/ingredientActions";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import { useHistory } from "react-router";
import { VscZoomIn } from "react-icons/vsc";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));
const EditIngredient = ({ingredient}) => {
  const classes = useStyles();

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Content of the modal");
  const [image, setImage] = React.useState(null);
  const [url, setUrl] = React.useState(null);
  const [info, setInfo] = React.useState(null);

  const history = useHistory();
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    
      setModalText("The modal will be closed after two seconds");
      setConfirmLoading(true);
      dispatch(updateIngredient(ingredient._id,info, image ))
      setTimeout(() => {
        dispatch(getIngredients())

        setVisible(false);
        setConfirmLoading(false);
/*         window.location.reload();
 */      }, 2000);
    
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
  }, [dispatch]);

  const categories = useSelector((state) => state.categoryReducer.categories);

  const selectImageToUpload = (e) => {
    setImage(e.target.files[0]);
    setUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  

  return (
    <>
      <VscZoomIn  onClick={showModal}/>
        
      <Modal
        title=""
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <DialogContent>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              autoFocus
              margin="dense"
              name="name"
              id="name"
              label="name"
              type="text"
              onChange={handleChange}
              fullWidth
              required
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

            <FormControl
              as="select"
              id="standard-select-currency"
              name="category"
              defaultValue="category"
              onChange={handleChange}
              placeholder="choisissez votre mode de livraison"
              required
            >
              <option value="">Choisissez une category</option>
              {categories
                ? categories.map((el) => (
                    <>
                      <option value={el._id}>{el.name}</option>
                    </>
                  ))
                : null}
            </FormControl>

            <div class="file file--upload">
              <label></label>
              <input
                id="input-file"
                type="file"
                required
                onChange={selectImageToUpload}
              ></input>

              {image ? (
                <img
                  src={url}
                  style={{ height: "100px", width: "150px", padding: "15px" }}
                />
              ) : null}
            </div>
          </form>
        </DialogContent>
      </Modal>
    </>
  );
};
export default EditIngredient;
