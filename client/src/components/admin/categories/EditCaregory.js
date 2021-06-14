
import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";

import { useDispatch} from "react-redux";
import {  getCategories, updateCategory } from '../../../Redux/Actions/categoryActions'

import { VscZoomIn } from "react-icons/vsc";
import { getIngredients } from "../../../Redux/Actions/ingredientActions";
import Modal from "antd/lib/modal/Modal";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));
export default function EditCategory({id, img}) {
  const classes = useStyles();

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Content of the modal");
  const [image, setImage] = React.useState(null);
  const [url, setUrl] = React.useState(null);
  const [info, setInfo] = React.useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
  }, [dispatch]);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const selectImageToUpload = (e) => {
    setImage(e.target.files[0]);
    setUrl(URL.createObjectURL(e.target.files[0]));
  };
  const handleOk = () => {
    
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    dispatch(updateCategory(id, info));  
      setTimeout(() => {
        dispatch(getCategories())

      setVisible(false);
      setConfirmLoading(false);
/*         window.location.reload();
*/      }, 2000);
  
};
  
  const changeHandler = (e) => setInfo( {[e.target.name]: e.target.value });


  return (
    <div>
      <VscZoomIn onClick={showModal}/>
      
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
              onChange={changeHandler}
              fullWidth
              required
            />

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
    </div>
  );
}