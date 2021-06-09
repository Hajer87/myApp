import React from 'react'
import {Card, Container} from 'react-bootstrap'
import '../../assets/style/panier.css'

const FicheCommande = ({commande}) => {

  
  return (
<Container id="tickets" >
<Card className="text-center">

  <Card.Header className="titre">
    <span>Commande</span>
</Card.Header> 
{commande.map((el,index) =>
<>
    <Card.Body >
       
    <Card.Text className="fiche">
<span style={{textAlign:"left"}}>
{el.name}
</span>
    </Card.Text>
  
   
  </Card.Body>
  
  </>  )}
</Card>

</Container>




  )
}

export default FicheCommande
