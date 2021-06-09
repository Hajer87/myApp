import React from 'react'
import {  Form } from 'react-bootstrap'
import '../../assets/style/panier.css'
import 'rc-time-picker/assets/index.css';

import moment from 'moment';

import TimePicker from 'rc-time-picker';

const showSecond = true;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';


const Livraison = ({setData, data, setShowLocation}) => {

 const handleChanged=(e)=>{
  setData({...data, livraison:e.target.value})
  setShowLocation(data.livraison)

  }


  const handleDetails=(e)=>{
setData({...data, [e.target.name]:e.target.value})


  }
  function onChange(value) {
    console.log(value && value.format(str));
    setData({...data, heure:(value && value.format(str))})

  }

  return (
<div id="livraison" className="box">
 <h2>Livraison</h2>  
<Form>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Date et heure de Livraison</Form.Label>
    <Form.Control 
    type="Date" 
    name="date" 
    placeholder="date de livraison"
    onChange={handleDetails}/>
    <Form>
    <TimePicker
    style={{ width: 100 }}
    showSecond={showSecond}
    defaultValue={moment()}
    className="xxx"
    onChange={onChange}
  />,  
  </Form>
  <Form.Label>Numéro de téléphone</Form.Label>
  <Form.Control 
  name="tel"
   type="tel" 
  placeholder="Numéro de téléphone" 
  
  onChange={handleDetails}/>

  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Mode de livraison </Form.Label>

    <Form.Control  
     as="select" 
     placeholder='choisissez votre mode de livraison'
     onChange={handleChanged}>
    <option  value="" disabled selected>choisissez votre mode de livraison</option> 
      <option  value="true">A domicile</option>
      <option  value= "false">Retrait au magasin</option>
      
    </Form.Control>
   
        
  </Form.Group>
  
</Form>         

</div>
                         )
}

export default Livraison
