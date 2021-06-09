import React, { useEffect} from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import getUsers from "../../Redux/Actions/usersAction";
import Navigation from "../LandingPag.js/navigation";
import Loading from "../Loading";
import Sidebar from "./Sidebar";
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

  /* if (users.isLoading) {
    return <Loading />;
  } */
  return (
    <div>
      <Sidebar />

      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
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
              <td>
                {user.isAdmin ? (
                  <i className="fas fa-check" style={{ color: "green" }} />
                ) : (
                  <i className="fas fa-times" style={{ color: "red" }} />
                )}
              </td>
              <td>
                <Link to={`/admin/user/${user._id}/edit`}>
                  <Button variant="light" className="btn-sm">
                    <i className="fas fa-edit" />
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  className="btn-sm"
                 /*  onClick={() => deleteHandler(user._id)} */
                >
                  <i className="fas fa-trash" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersList;
