import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { BsTrash } from "react-icons/bs";
import "../../assets/style/panier.css";
import { useHistory } from "react-router-dom";
import FicheCommande from "./FicheCommande";
import Livraison from "./Livraison";
import Total from "./Total";

import {
  deleteCommande,
  
} from "../../Redux/Actions/Orders/commandeActions";
import Navigation from "../LandingPag.js/navigation";

const Panier = ({ setShowCart}) => {
  const[errors, setErrors]=useState(null)

  const panier = useSelector((state) => state.commandeReducer.commandes);
  console.log(panier)
  
  const dispatch = useDispatch();

    useEffect(() => {
  localStorage.setItem('commandes', JSON.stringify(panier))
  }, [panier])  
 
  const history = useHistory();
  const [data, setData] = useState({
    date: new window.Date(),
   address:null,
    livraison: null,
    total: null,
  });


  const handledelete = (index) => {
    dispatch(deleteCommande(index));
    
  };
  const handleClick = () => {
    history.push("/#commande");
  };
 /*  const handleRetourAdd = () => {
    setShowCart(false);
  };
  const handlevalidation = (array) => {
    dispatch(addOrder(array));
  }; */

  return (
    <div>
      <Navigation/>
      <Container id="panier">
        {panier.length === 0 ? (
          <>
            <h2>Votre panier est vide</h2>
            <button  className="button" onClick={handleClick}>revenir au menu</button>
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
              data={data}
              setData={setData}
              errors={errors} setErrors={setErrors}
            />

            <Total data={data} setData={setData} errors={errors} setErrors={setErrors} />
           
          </>
        ) : null}
      </Container>
    </div>
  );
};

export default Panier;
