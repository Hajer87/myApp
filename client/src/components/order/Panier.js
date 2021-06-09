import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BsTrash } from "react-icons/bs";
import "../../assets/style/panier.css";
import { Link, useHistory } from "react-router-dom";
import FicheCommande from "./FicheCommande";
import Livraison from "./Livraison";
import Localisation from "./Localisation";
import Total from "./Total";

import {
  deleteCommande,
  addDetails,
  addAddress,
} from "../../Redux/Actions/Orders/commandeActions";
import { Button, Divider } from "@material-ui/core";
import { addOrder } from "../../Redux/Actions/Orders/order";
import Navigation from "../LandingPag.js/navigation";
import { load_user } from "../../Redux/Actions/AuthActions";

const Panier = ({ setShowCart }) => {
  const panier = useSelector((state) => state.commandeReducer.commandes);
  console.log(panier)
  
  const dispatch = useDispatch();

  /*  useEffect(() => {
  localStorage.setItem('commandes', JSON.stringify(panier))
  }, [panier])  */
  /* const cart=useSelector(state=>state.commandeReducer) */
  const [showLocation, setShowLocation] = useState(false);
  const history = useHistory();
  const [data, setData] = useState({
    date: null,
    heure: null,
    livraison: false,
    total: null,
  });


  const handledelete = (index) => {
    dispatch(deleteCommande(index));
  };
  const handleClick = () => {
    history.push("/#commande");
  };
  const handleRetourAdd = () => {
    setShowCart(false);
  };
  const handlevalidation = (array) => {
    dispatch(addOrder(array));
  };

  return (
    <div>
      <Navigation/>
      <Container id="panier">
        {panier.length === 0 ? (
          <>
            <h2>Votre panier est vide</h2>
            <button onClick={handleClick}>revenir au menu</button>
          </>
        ) : (
          <>
            <h2>Voici votre panier</h2>
            <div className="commandes">
              {panier.map((el, index) => (
                <div>
                  <BsTrash onClick={() => handledelete(index)} />

                  <FicheCommande key={el._id} commande={el} />
                </div>
              ))}
            </div>
          </>
        )}
        {panier.length !== 0 ? (
          <>
            <Livraison
              setShowLocation={setShowLocation}
              data={data}
              setData={setData}
            />
           {/* <Localisation />  */}

            <Total data={data} setData={setData} />
          </>
        ) : null}
      </Container>
    </div>
  );
};

export default Panier;
