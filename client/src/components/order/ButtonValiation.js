import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { addCommande } from '../../Redux/Actions/Orders/commandeActions';
import { resetBol } from '../../Redux/Actions/Orders/content';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Icon from '@material-ui/core/Icon';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    color:"#ffffff",
    backgroundColor: "#9ACD32",
    padding: "15px 30px",
    display:" flex",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    fontSize: "15px",
    
    transition: "all 0.3s",
    zIndex: "100",
  },
}));

const ButtonValiation = ({setOpen, myBol , setShowCart, count, setCount}) => {
  const classes = useStyles();
const history=useHistory()
const auth=useSelector(state=>state.AuthReducer.isAuth)
  const dispatch = useDispatch();
  const handleValidateBol = (Bol) => {
     if (auth)
    {dispatch(addCommande(myBol))
      setCount(count+1)
      setOpen(false);
    dispatch(resetBol());}
else
history.push('/login')
    
  }


const save = () => {
  if (auth)
  {dispatch(addCommande(myBol))
setCount(count+1)
  setOpen(false);
  dispatch(resetBol());
  setShowCart(true)
  history.push('/panier')}
  else
  history.push('/login')
  
};
  return (
    <div style={{display:"grid", gridTemplateColumns: "50% 50%"}}>

<Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
        onClick={() => handleValidateBol()}
      >
        <a href="#commande">valider et ajouter un autre bol</a>
      </Button>

      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={save}
      >
        <a href="#panier">Enregistrer</a>
      </Button>


     
      
    </div>
  )
}

export default ButtonValiation
