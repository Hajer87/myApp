import React from 'react'
import {  Card, Container, Form } from 'react-bootstrap'
import '../../assets/style/panier.css'
import 'rc-time-picker/assets/index.css';
import DateHeure from './DateHeure';
import '../../assets/style/details.css'


const Livraison = ({setData, data, setShowLocation}) => {

 const handleChanged=(e)=>{
  setData({...data, livraison:e.target.value})
localStorage.setItem('livraison', !data.livraison)
  }


  const handleDetails=(e)=>{
setData({...data, [e.target.name]:e.target.value})
  }
  
  return (
<Container id="livraison" className="details" >

<Card style={{fontSize:"large"}}>
  <Card.Header><h2>Livraison</h2></Card.Header>
  <Card.Body>
  <Form >
  <Form.Group controlId="exampleForm.ControlInput1">
    
  <Form.Label >Date et heure de livraison </Form.Label>
   <DateHeure handleDetails={handleDetails}/>
   

  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Mode de livraison </Form.Label>

    <Form.Control  
    style={{fontSize:"large"}}
     as="select" 
     name='livraison'
     placeholder='choisissez votre mode de livraison'
     onChange={handleChanged}>
    <option  value="" disabled selected>choisissez votre mode de livraison</option> 
      <option  value="domicile">A domicile</option>
      <option  value= "magasin">Retrait au magasin</option>
      
    </Form.Control>
   
        
  </Form.Group>
  
</Form>        
  </Card.Body>
</Card>

 
</Container>
                         )
}

export default Livraison
