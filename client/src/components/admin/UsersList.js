import React, { useEffect} from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import Navigation from "../LandingPag.js/navigation";
import Loading from "../Loading";
const UsersList = ({history}) => {
  const person = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  /* useEffect(() => {
    if (person.isAdmin) {
      const users=localStorage.getItem('users')
    } else {
      history.push("/login");
    }
  }, [dispatch, history, person]); */
  const users=JSON.parse(localStorage.getItem('users'))

  if (users.isLoading) {
    return <Loading />;
  } 
  return (
    <div>
      <Navigation/>

      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>Adresse</th>
            <th>ADMIN</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.firstname} {user.lastname}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>{user.ville} , {user.city}, code postal: {user.codePostal}</td>
              <td>
                {user.isAdmin ? (
                  <i className="fas fa-check" style={{ color: "green" }} />
                ) : (
                  <i className="fas fa-times" style={{ color: "red" }} />
                )}
              </td>
             
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersList;
