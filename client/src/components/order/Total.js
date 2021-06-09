import React, { useEffect} from "react";
import {Link, useHistory} from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { useDispatch, useSelector } from "react-redux";
import {getShippingPrice, updateCommande} from "../../Redux/Actions/Orders/commandeActions";
import { deleteCommande, addDetails, addAddress } from '../../Redux/Actions/Orders/commandeActions'
import { addOrder } from "../../Redux/Actions/Orders/order";


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Total({ setData, data}) {
    const history = useHistory();

  const orders = useSelector((state) => state.commandeReducer.commandes);
  
  const price = orders.reduce((acc, order) => {
    return (acc += order.reduce((accumulator, el) => {
      return (accumulator += el.price);
    }, 0));
  }, 0);
  console.log(price)
  const dispatch = useDispatch();
  /* const panier = useSelector(state => state.commandeReducer)
  const array=panier.commandes.map((cmd)=>cmd.map((el)=>el.name))
  console.log(array)  */
  useEffect(() => {
/*     dispatch(updateCommande(array))
 */
    dispatch(getShippingPrice());
  }, [dispatch]);

  const shipping = useSelector((state) => state.commandeReducer.shipping);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setData({ ...data, total: price })
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
      
      
      dispatch(addDetails(data))
      const address=localStorage.getItem('address')
      dispatch(addAddress(address))
      localStorage.setItem('data', JSON.stringify(data))
      /* dispatch(updateCommande(array)) */
      
        setOpen(false);
        history.push("/checkout")
   

  };

 
   
  

  const address = JSON.parse(localStorage.getItem("address"));
  return (
    <div>
      <Button variant="secondary" size="lg" block onClick={()=>handleClickOpen(data)}>
        <h2>Valider la commande</h2>
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h3" className={classes.title}>
              Récap
            </Typography>
            <Button
              onClick={handleClick}
              autoFocus
              color="inherit"
            >
              Valider
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <div className="boxTotal">
            <h2>Total commande:</h2>
            <span>
              {price}.00 <span>DT</span>
            </span>
          </div>
          <Divider />
          {data.livraison ? (
            <>
              <div className="boxTotal">
                <h2>Frais de livraison:</h2>
                <span>
                  {shipping}.00 <span>DT</span>
                </span>
              </div>
              <Divider />
              <div className="boxTotal">
                <h2>Total:</h2>
                <span>
                  {price + shipping}.00 <span>DT</span>
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="boxTotal">
                <h2>Frais de livraison:</h2>
                <span>
                  {" "}
                  0.00 <span>DT</span>
                </span>
              </div>
              <div className="boxTotal">
                <h2>Total:</h2>
                <span>
                  {price}.00 <span>DT</span>
                </span>
              </div>
            </>
          )}
          <Divider />
          <Divider />
          <div className="boxTotal">
            <h2>Numéro de téléphone</h2>
            <span>{data.tel}</span>
          </div>
          <Divider />
          <div className="boxTotal">
            <h2>Date et heure de livraison</h2>
            <span>{`Le ${data.date} à ${data.heure}`}</span>
          </div>
          <Divider />
          {address ? (
            <div className="boxTotal">
              <h2>adresse de livraison:</h2>
              <span>{`${address.locality}-${address.streetAddress}-${address.postalcode}`}</span>
            </div>
          ) : null}
 
        </List>
      </Dialog>
    </div>
  );
}
