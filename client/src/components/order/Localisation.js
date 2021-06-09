import React, { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

const Localisation = () => {
    const [address, setAddress]=useState({
        ville:"",
        cité:"",
        codePostal:""
    })
    const handleChange=(e)=>{
        setAddress({[e.target.name]: e.target.value})
    }
    const handleSubmit=()=>{
        localStorage.setItem('address',JSON.stringify(address))

    }
    return (
        <div>
         <Form>
  
  <Form.Group className="mb-3" controlId="formGridAddress1">
    <Form.Label>Address</Form.Label>
    <Form.Control placeholder="1234 Main St" onChange={handleChange} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formGridAddress2">
    <Form.Label>Address 2</Form.Label>
    <Form.Control placeholder="Apartment, studio, or floor" onChange={handleChange} />
  </Form.Group>

  <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridCity">
      <Form.Label>City</Form.Label>
      <Form.Control onChange={handleChange} />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridState">
      <Form.Label>State</Form.Label>
      <Form.Select defaultValue="Choose..." onChange={handleChange} >
        <option>Choose...</option>
        <option>...</option>
      </Form.Select>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Zip</Form.Label>
      <Form.Control onChange={handleChange} />
    </Form.Group>
  </Row>

  <Form.Group className="mb-3" id="formGridCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>

  <Button onClick={handleSubmit} variant="primary" type="submit">
valider votre adresse
  </Button>
</Form>
        </div>
    )
}

export default Localisation






