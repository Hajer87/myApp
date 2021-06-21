import React , {useState} from 'react'
import {  Card, Container, Form } from 'react-bootstrap'
import '../../assets/style/panier.css'
import 'rc-time-picker/assets/index.css';
import '../../assets/style/details.css'
import Date from './Date..js';
import Time from './Time.js';

const Livraison = ({setData, data, errors, setErrors}) => {
  const user=JSON.parse(localStorage.getItem('user'))

 const handleChanged=(e)=>{
  setData({...data, livraison:e.target.value, address: `${user.ville} ${user.city} ${user.codePostal}`})
  

localStorage.setItem('livraison', !data.livraison)
  }


 /*  const handleDetails=(e)=>{
setData({...data, [e.target.name]:e.target.value})
  }
   */
  return (
<Container id="livraison" className="details" >

<Card style={{fontSize:"large"}}>
  <Card.Header><h2>Livraison</h2></Card.Header>
  <Card.Body>
  <Form >
  <Form.Group controlId="exampleForm.ControlInput1">
    
  <Form.Label >Date et heure de livraison </Form.Label>
   <Date data={data} setData={setData}/>
   { !data.date ? <h5 className="errors">{errors}</h5>: null}
   <Time data={data} setData={setData}/>
   { !data.heure ? <h5 className="errors">{errors}</h5>: null}


  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Mode de livraison </Form.Label>

    <Form.Control  
    style={{fontSize:"large"}}
     as="select" 
     name='livraison'
     placeholder='choisissez votre mode de livraison'
     onChange={handleChanged}
     >
       {!data.livraison ? <h5 className="errors">{errors}</h5> : null}
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
