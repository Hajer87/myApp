
import React, { useEffect } from "react";
import { Modal } from "antd";
import { useDispatch } from "react-redux";
import {  getCategories, updateCategory } from "../../../Redux/Actions/categoryActions";
import {
  getIngredients,
  
} from "../../../Redux/Actions/ingredientActions";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import { VscZoomIn } from "react-icons/vsc";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));
const EditCategory = ({id, img, nom}) => {
  const classes = useStyles();

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Content of the modal");
  const [image, setImage] = React.useState(img);
  const [url, setUrl] = React.useState(null);

  const [info, setInfo] = React.useState({name: nom});

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    dispatch(updateCategory(id,info, image));
    setTimeout(() => {
      dispatch(getCategories())
      setVisible(false);
     
      setConfirmLoading(false);
    }, 2000);
  }

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
    
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
  }, [dispatch]);


  const selectImageToUpload = (e) => {
    setImage(e.target.files[0]);
    setUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  

  return (
    <>
      <VscZoomIn onClick={showModal}>
       
      </VscZoomIn>
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
              value={info.name}
              label="name"
              type="text"
              onChange={handleChange}
              fullWidth
             
            />

           

            <div class="file file--upload">
              <label></label>
              <input
                id="input-file"
                type="file"
               
                onChange={selectImageToUpload}
              ></input>

              {image ? (
                <img
                  src={url}
                  style={{ height: "100px", width: "150px", padding: "15px" }}
                  alt=""
                />
              ) : null}
            </div>
          </form>
        </DialogContent>
      </Modal>
    </>
  );
};
export default EditCategory;
