import React, { useEffect, useState } from 'react'
import {  Carousel } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { resetCommande, updateCommande } from '../../Redux/Actions/Orders/commandeActions'
import { addOrder } from '../../Redux/Actions/Orders/order'
import image1 from '../../assets/images/3.jpg'
import image2 from '../../assets/images/1.jpg'
import image3 from '../../assets/images/2.jpg'
import { Header } from '../LandingPag.js/header'
import Navigation from '../LandingPag.js/navigation'
import { useHistory } from 'react-router'

const Checkout = () => {
  const dispatch = useDispatch()
  const history=useHistory()
  const panier = useSelector(state => state.commandeReducer)
  
  const token=localStorage.getItem('token')
  useEffect(() => {
    dispatch(addOrder(panier))
     setTimeout(() => {

      dispatch(resetCommande())}
    , 3000); 
  }, [dispatch])


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
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
     

      </div>
  )
}

export default Checkout
