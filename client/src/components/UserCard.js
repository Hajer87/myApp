import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../assets/style/profile.css";
import { getIngredients } from "../Redux/Actions/ingredientActions";
import { getOrders } from "../Redux/Actions/Orders/order";
import { updateUser, updateUserAvatar } from "../Redux/Actions/usersAction";
import { MdModeEdit } from "react-icons/md";
import Loading from "./Loading";
import { Divider } from "antd";
import { Avatar, CardMedia } from "@material-ui/core";

const UserCard = ({ user }) => {
  //update name
  const [showName, setShowName] = useState(false);
  const [name, setName] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
  });
  const changeHandler = (e) => {
    setName({ ...name, [e.target.name]: e.target.value });
  };
  const UpdateNameHandler = (id) => {
    dispatch(updateUser(id, name));
    setShowName(false);
  };
  //update email
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState({
    email: "",
  });
  const changeEmailHandler = (e) => {
    setEmail({ ...email, [e.target.name]: e.target.value });
  };
  const UpdateEmailHandler = (id) => {
    dispatch(updateUser(id, email));
    setShowEmail(false);
  };
  //update phoneNumber
  const [showPhone, setShowPhone] = useState(false);
  const [phone, setPhone] = useState({
    phoneNumber: user.phoneNumber,
  });
  const changePhoneHandler = (e) => {
    setPhone({ ...phone, [e.target.name]: e.target.value });
  };
  const UpdatePhoneHandler = (id) => {
    dispatch(updateUser(id, phone));
    setShowPhone(false);
  };
  //update ADDRESS
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState({
    ville: user.ville,
    city: user.city,
    codePostal: user.codePostal,
  });
  const changeAddressHandler = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };
  const UpdateAddressHandler = (id) => {
    dispatch(updateUser(id, address));
    setShowAddress(false);
  };
  //update image de profile
  const [image, setImage] = React.useState(user.avatar);
  const [buttonValidation, setButtonValidation] = useState(false);
  const selectImageToUpload = (e) => {
    setImage(e.target.files[0]);
    setButtonValidation(true);
  };
  const handleClickValiation = (id, image) => {
    dispatch(updateUserAvatar(id, image));
    setButtonValidation(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
    dispatch(getIngredients());
  }, [dispatch]);
  const orders = JSON.parse(localStorage.getItem("orders"));
  const commandes = orders.filter((order) => order.user._id == user._id);
  const ingredients = useSelector(
    (state) => state.ingredientReducer.ingredients
  );
  console.log(commandes);
  /* const tab= commandes.map((cmd)=>cmd.commandes.map((el)=>el.map((ing)=>ingredients.find((e)=>e._id===ing))))
console.log(tab) */
  return orders.isLoading ? (
    <Loading />
  ) : (
    /*  <>
      <Container className="card">
        <Card.Header as="h2">
          {" "}
          {!showName ? (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "90% 10%",
                  gap: "20px",
                  
                }}
              >
                <span>
                  {" "}
                  {user.firstname} {user.lastname}
                </span>
                <MdModeEdit onClick={() => setShowName(true)}>edit</MdModeEdit>
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "45% 45% 10%",
                  gap: "20px",
                }}
              >
                <input
                  name="firstname"
                  value={name.firstname}
                  onChange={changeHandler}
                />
                <input
                  name="lastname"
                  value={name.lastname}
                  onChange={changeHandler}
                />
                <Button onClick={() => UpdateNameHandler(user._id, name)}>
                  ok
                </Button>
              </div>
            </>
          )}
        </Card.Header>
        <Card.Body>
          <Card.Title>
            {!showEmail ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "90% 10%",
                  gap: "20px",
                }}
              >
                <h3>{user.email}</h3>
                <MdModeEdit onClick={() => setShowEmail(true)}>edit</MdModeEdit>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  name="email"
                  onChange={changeEmailHandler}
                />
                <Button onClick={() => UpdateEmailHandler(user._id, email)}>
                  ok
                </Button>
              </>
            )}
          </Card.Title>
          <Divider/>
          <Card.Text>
            {!showPhone ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "90% 10%",
                  gap: "20px",
                }}
              >
                <h3>{user.phoneNumber}</h3>
                <MdModeEdit onClick={() => setShowPhone(true)}>edit</MdModeEdit>
              </div>
            ) : (
              <>
                <input
                  type="number"
                  value={phone.phoneNumber}
                  name="phoneNumber"
                  onChange={changePhoneHandler}
                />
                <Button onClick={() => UpdatePhoneHandler(user._id, phone)}>
                  ok
                </Button>
              </>
            )}

<Divider/>
            {!showAddress ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "90% 10%",
                  gap: "20px",
                }}
              >
                <h3>
                  {user.ville} {user.city}- {user.codePostal}
                </h3>
                <MdModeEdit onClick={() => setShowAddress(true)}>
                  edit
                </MdModeEdit>
              </div>
            ) : (
              <>
                <input
                  value={address.ville}
                  type="text"
                  name="ville"
                  onChange={changeAddressHandler}
                />
                <input
                  value={address.city}
                  type="text"
                  name="city"
                  onChange={changeAddressHandler}
                />
                <input
                  value={address.codePosatl}
                  type="number"
                  name="codePostal"
                  onChange={changeAddressHandler}
                />
                <Button onClick={() => UpdateAddressHandler(user._id, address)}>
                  ok
                </Button>
              </>
            )}
          </Card.Text>
         
        </Card.Body>
      </Container> */

    <Container>
      <Col>
        <div className="panel panel-default">
          <div className="panel-heading">
            {" "}
            <h4>Profile d'utilisateur</h4>
          </div>
          <div className="panel-body">
            <div className="col-md-4 col-xs-12 col-sm-6 col-lg-4">
              <Image
                alt="User Pic"
                src={user.avatar}
                id="profile-image1"
                className=" img-responsive rounded-circle p-1 bg-primary"
                rounded
              />

              <label for="file-upload" class="custom-file-upload">
                <i class="fa fa-cloud-upload"></i> Changer photo de profile
              </label>
              <input
              className="input"
                id="file-upload"
                type="file"
                name="avatar"
                placeholder="changer photo de profile"
                required
                onChange={selectImageToUpload}
              ></input>
              {buttonValidation ? (
                <button onClick={() => handleClickValiation(user._id, image)}>
                  valider
                </button>
              ) : null}
            </div>
            <div className="col-md-8 col-xs-12 col-sm-6 col-lg-8">
              <div className="container">
                {!showName ? (
                  <>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "90% 10%",
                        gap: "20px",
                      }}
                    >
                      <h2>
                        {" "}
                        {user.firstname} {user.lastname}
                      </h2>
                      <MdModeEdit onClick={() => setShowName(true)}>
                        edit
                      </MdModeEdit>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "45% 45% 10%",
                        gap: "20px",
                      }}
                    >
                      <input
                        name="firstname"
                        value={name.firstname}
                        onChange={changeHandler}
                      />
                      <input
                        name="lastname"
                        value={name.lastname}
                        onChange={changeHandler}
                      />
                      <Button onClick={() => UpdateNameHandler(user._id, name)}>
                        ok
                      </Button>
                    </div>
                  </>
                )}
              </div>
              <hr />
              <Container className="card">
                <Card.Body>
                  <Card.Title>
                    {!showEmail ? (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "90% 10%",
                          gap: "20px",
                        }}
                      >
                        <h3>{user.email}</h3>
                        <MdModeEdit onClick={() => setShowEmail(true)}>
                          edit
                        </MdModeEdit>
                      </div>
                    ) : (
                      <>
                        <input
                          type="email"
                          name="email"
                          onChange={changeEmailHandler}
                        />
                        <Button
                          onClick={() => UpdateEmailHandler(user._id, email)}
                        >
                          ok
                        </Button>
                      </>
                    )}
                  </Card.Title>
                  <Divider />
                  <Card.Text>
                    {!showPhone ? (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "90% 10%",
                          gap: "20px",
                        }}
                      >
                        <h3>{user.phoneNumber}</h3>
                        <MdModeEdit onClick={() => setShowPhone(true)}>
                          edit
                        </MdModeEdit>
                      </div>
                    ) : (
                      <>
                        <input
                          type="number"
                          value={phone.phoneNumber}
                          name="phoneNumber"
                          onChange={changePhoneHandler}
                        />
                        <Button
                          onClick={() => UpdatePhoneHandler(user._id, phone)}
                        >
                          ok
                        </Button>
                      </>
                    )}

                    <Divider />
                    {!showAddress ? (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "90% 10%",
                          gap: "20px",
                        }}
                      >
                        <h3>
                          {user.ville} {user.city}- {user.codePostal}
                        </h3>
                        <MdModeEdit onClick={() => setShowAddress(true)}>
                          edit
                        </MdModeEdit>
                      </div>
                    ) : (
                      <>
                        <input
                          value={address.ville}
                          type="text"
                          name="ville"
                          onChange={changeAddressHandler}
                        />
                        <input
                          value={address.city}
                          type="text"
                          name="city"
                          onChange={changeAddressHandler}
                        />
                        <input
                          value={address.codePosatl}
                          type="number"
                          name="codePostal"
                          onChange={changeAddressHandler}
                        />
                        <Button
                          onClick={() =>
                            UpdateAddressHandler(user._id, address)
                          }
                        >
                          ok
                        </Button>
                      </>
                    )}
                  </Card.Text>
                </Card.Body>
              </Container>
              <hr />
            </div>
          </div>
        </div>
      </Col>
    </Container>
  );
};

export default UserCard;
