import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsTrash, BsXCircle } from "react-icons/bs";
import ButtonValidation from './ButtonValiation'
import "../../assets/style/ingredients.css";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { deleteFromBol} from "../../Redux/Actions/Orders/content";
import { Container } from "react-bootstrap";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});
const MesBols = ({ setCart, setOpen, setShowCart}) => {
  const classes = useStyles();
  const myBol = useSelector((state) => state.contentReducer.content);

  const dispatch = useDispatch()
  /* const [commandes, setCommandes]=useState(null) */
/* useEffect(() => {
  localStorage.setItem('commandes', JSON.stringify(commandes))
}, [commandes])
console.log(commandes) */
  return (
    <Container id="myBol">
      <BsXCircle onClick={() => setCart(false)} />
      <h2> Ma composition</h2>

      <div className="cart">
        {myBol.map((el) => (
          <div className="card">
            <Card className={classes.root}>
              <CardActionArea>
                <button
                  style={{ background: "transparent", border: "none" }}
                  onClick={() => dispatch(deleteFromBol(el._id))}
                >
                  <BsTrash />
                </button>

                <CardMedia
                  component="img"
                  alt={el.name}
                  height="140"
                  image={el.image}
                  title={el.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {el.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        ))}
      </div>

      <ButtonValidation  setOpen={setOpen} myBol={myBol} setShowCart={setShowCart}/>
      
    </Container>
    
  );
};

export default MesBols;
