import React, { useEffect} from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch} from "react-redux";
import Loading from "../../Loading";
import UserCard from "./UserCard";
import '../../../assets/style/UserList.css'
import UserSearch from "./UserSearch";
import AdminNav from "../AdminNav/AdminNav";
import { Avatar } from "@material-ui/core";
import { GrUserAdmin, GrUserExpert } from "react-icons/gr";
const UsersList = ({history}) => {
  const [search, setSearch]=React.useState('')
  const users=JSON.parse(localStorage.getItem('users'))

  if (users.isLoading) {
    return <Loading />;
  } 
  return (
<>
<AdminNav/>
<UserSearch search={search} setSearch={setSearch} />

    
      
    
    
    
   <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>avatar</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>Adresse</th>
            <th>Numéro de téléphone</th>
            <th>ADMIN</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users
          .filter((user)=>user.firstname.toUpperCase().includes(search.toUpperCase()) || user.lastname.toUpperCase().includes(search.toUpperCase())|| user.email.toUpperCase().includes(search.toUpperCase()) || user._id.includes(search)).map((user) => 
            <tr key={user._id}>
              <td>{user._id}</td>
              <td><Avatar alt="Remy Sharp" src={user.avatar} /></td>
              <td>{user.firstname} {user.lastname}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>
              <td>{user.ville} , {user.city}, {user.codePostal}</td>
              <td>{user.phoneNumber}</td>
              <td>
                {user.isAdmin ? (
                 <GrUserAdmin style={{color:"vert"}}/>
                ) : (
                  <GrUserExpert style={{color:"red"}}/>
                )}
              </td>
             
            </tr>
      )}
        </tbody>
      </Table>  
    
    </>
  );
};

export default UsersList;
