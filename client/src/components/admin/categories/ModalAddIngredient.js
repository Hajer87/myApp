import React, { useEffect } from "react";
import { Modal } from "antd";
import { Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../Redux/Actions/categoryActions";
import {
  getIngredients,
  createIngredient,
} from "../../../Redux/Actions/ingredientActions";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import { useHistory } from "react-router";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
}));
const ModalAddIngredient = () => {
  const classes = useStyles();

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Content of the modal");
  const [image, setImage] = React.useState(null);
  const [url, setUrl] = React.useState(null);

  const [data, setData] = React.useState({
    name: null,
    description: null,
    price: null,
    category: null,
  });
  const history = useHistory();
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    if (!data.name || !data.price || !data.category || !image) {
      alert("vous devez remplir touts les champs");
    } else {
      setModalText("The modal will be closed after two seconds");
      setConfirmLoading(true);
      dispatch(createIngredient(data, image));

      setTimeout(() => {
/*         dispatch(getIngredients())
 */        setVisible(false);
        setConfirmLoading(false);
      }, 2000);
    }
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
    setData({ ...data, [e.target.name]: e.target.value });
  };

  

  return (
    <>
      <Button className="button" onClick={showModal}>
        Ajouter un ingrédient
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
export default ModalAddIngredient;
