
import React from "react";
import { Card } from "react-bootstrap";
import '../../../assets/style/UserList.css'



const UserCard = ({ user }) => {
 

  return (
    <div className="userCard">
      <Card>
  <Card.Header>{user.firstname} {user.lastname}</Card.Header>
  <Card.Body>
    <Card.Title><a href={`mailto:${user.email}`}>{user.email}</a></Card.Title>
    <Card.Text>
     <span>Adresse: {user.Ville} - {user.city} - {user.codePostal}</span>
     <br/>
     <span>Numéro de téléphone: {user.phoneNumber}</span>
    </Card.Text>
  </Card.Body>
</Card>
    </div>
  );
};

export default UserCard;
