/* import React, { useEffect } from "react";
import { Modal, Button } from "antd";
import { useDispatch } from "react-redux";
import {
  createCategory,
  getCategories,
} from "../../../Redux/Actions/categoryActions";
import {
  getIngredients,
  
} from "../../../Redux/Actions/ingredientActions";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";


import DialogContent from "@material-ui/core/DialogContent";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));
const ModalAddCategory = () => {
  const classes = useStyles();

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Content of the modal");
  const [name, setName] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [url, setUrl] = React.useState(null);

  const dispatch = useDispatch();
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    if (!name || !image) {
      alert("vous devez remplir touts les champs");
    } else {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    dispatch(createCategory(name, image));
    setTimeout(() => {
      dispatch(getCategories())
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };}

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getIngredients());
  }, [dispatch]);

  const selectImageToUpload = (e) => {
    setImage(e.target.files[0]);
    setUrl(URL.createObjectURL(e.target.files[0]));
  };

  const changeHandler = (e) => setName(e.target.value);

  return (
    <>
      <Button className="button" onClick={showModal}>
        Ajouter une catégory
      </Button>
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
          />

          <div class="file file--upload">
            <input
              id="input-file"
              type="file"
              required
              onChange={selectImageToUpload}
            >
              {" "}
            </input>
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
}; */
/* export default ModalAddCategory;  */


import React, { useEffect } from "react";
import { Modal } from "antd";
import { Button } from "react-bootstrap";
import '../../../assets/style/admin.css'
import { useDispatch, useSelector } from "react-redux";
import { createCategory, getCategories } from "../../../Redux/Actions/categoryActions";
import {
  getIngredients,
} from "../../../Redux/Actions/ingredientActions";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));
const ModalAddCategory = () => {
  const classes = useStyles();
const [errors, setErrors]=React.useState(null)
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Content of the modal");
  const [image, setImage] = React.useState(null);
  const [url, setUrl] = React.useState(null);

  const [info, setInfo] = React.useState({name:null});
const cat=useSelector(state=>state.categoryReducer)
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    dispatch(createCategory(info,image));
if (cat.errors) {
  setErrors(cat.errors)

}
else{
    setTimeout(() => {
      dispatch(getCategories())
      setVisible(false);
      setInfo(null)
      setImage(null)
      setConfirmLoading(false);
    }, 2000);
  }
  }
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
    setInfo(null)
      setImage(null)
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
   setInfo({...info, [e.target.name]:e.target.value});
  };

  

  return (
    <>
      <button className="button categoryButton" onClick={showModal}>
        Ajouter une catégory
      </button>
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
/*               type="text"
 */              onChange={handleChange}
              fullWidth
             
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
                  alt=""
                />
              ) : null}
            </div>
            {errors && errors.map((error)=> <h5 className="errors">{error.msg}</h5>)}

          </form>
        </DialogContent>
      </Modal>
    </>
  );
};
export default ModalAddCategory;
