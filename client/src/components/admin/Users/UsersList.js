import React, { useEffect} from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch} from "react-redux";
import Loading from "../../Loading";
import UserCard from "./UserCard";
import '../../../assets/style/UserList.css'
import UserSearch from "./UserSearch";
import AdminNav from "../AdminNav/AdminNav";
const UsersList = ({history}) => {
  const [search, setSearch]=React.useState('')
  const users=JSON.parse(localStorage.getItem('users'))

  if (users.isLoading) {
    return <Loading />;
  } 
  return (
<>
<AdminNav/>
<UserSearch search={search} setSearch={setSearch}/>

    <div className="UserList">
      { users.filter(
        user =>
        
          user.email.toUpperCase().includes(search.toUpperCase())
      ).map((user)=>
    
      <UserCard user={user}/>)}
    
    {/* <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>Adresse</th>
            <th>Numéro de téléphone</th>
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
      </Table>  */}
    </div>
    </>
  );
};

export default UsersList;
