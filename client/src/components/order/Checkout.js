import React, { useEffect, useState } from 'react'
import {  Carousel } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { resetCommande} from '../../Redux/Actions/Orders/commandeActions'
import { addOrder } from '../../Redux/Actions/Orders/order'
import image1 from '../../assets/images/3.jpg'
import image2 from '../../assets/images/1.jpg'
import image3 from '../../assets/images/2.jpg'
import Navigation from '../LandingPag.js/navigation'

const Checkout = () => {
  const dispatch = useDispatch()
  const panier = useSelector(state => state.commandeReducer)
  
  useEffect(() => {
    dispatch(addOrder(panier))
     setTimeout(() => {

      dispatch(resetCommande())}
    , 3000); 
  }, [dispatch, panier])


  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
      <Navigation/>
      <h2>Votre commande a été envoyé avec succés</h2>
      <Carousel activeIndex={index} onSelect={handleSelect} style={{height: '1000px', width:'1000px',  marginLeft: "auto",
    marginRight: "auto"}}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image1}
          alt="First slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image2}
          alt="Second slide"
        />

        <Carousel.Caption>
         
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image3}
          alt="Third slide"
        />

        <Carousel.Caption>
         
         
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
     

      </div>
  )
}

export default Checkout
