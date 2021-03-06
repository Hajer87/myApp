import React, { useState, useEffect } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { Register_User } from "../../Redux/Actions/AuthActions";
import { Col, Row } from "react-bootstrap";
import Navigation from "../LandingPag.js/navigation";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/collection/575196/healthy-food)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register({ history }) {
  const classes = useStyles();

  const auth = useSelector((state) => state.AuthReducer);
  localStorage.getItem("isAuth");
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (auth.isAuth) {
      localStorage.setItem("isAuth", auth.isAuth);
      history.push("/");
    } else setErrors(auth.errors);
  }, [auth.isAuth, history, auth.errors]);

  const [newData, setNewData] = useState({
    firstname: "",
    lastname: "",
    ville: "",
    city: "",
    codePostal: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(Register_User(newData));
  };

  return (
    <>
    <Navigation/>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            S'inscrire
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              onFocus={() => setErrors(null)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstname"
              label="Prénom"
              name="firstname"
              /*  autoComplete="email" */
              autoFocus
              onChange={handleChange}
              required
            />
            <TextField
              onFocus={() => setErrors(null)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastname"
              label="Nom"
              name="lastname"
              autoComplete=""
              autoFocus
              onChange={handleChange}
            />
            <TextField
              onFocus={() => setErrors(null)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Adresse"
              name="email"
              autoComplete=""
              autoFocus
              onChange={handleChange}
            />
            <TextField
              onFocus={() => setErrors(null)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <TextField
              onFocus={() => setErrors(null)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="phoneNumber"
              label="Numéro de téléphone"
              type="Number"
              id="phoneNumber"
              autoComplete=""
              onChange={handleChange}
            />

            <Row>
              <Col>
                <TextField
                  onFocus={() => setErrors(null)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="Ville"
                  label="ville"
                  name="ville"
                  autoComplete=""
                  autoFocus
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <TextField
                  onFocus={() => setErrors(null)}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="City"
                  label="Cité"
                  name="city"
                  autoComplete="City"
                  autoFocus
                  onChange={handleChange}
                />
              </Col>
              <Col>
                <TextField
                  onFocus={() => setErrors(null)}
                  variant="outlined"
                  margin="normal"
                  required
                  id="codePostal"
                  label="Code postal"
                  name="codePostal"
                  autoComplete=""
                  autoFocus
                  onChange={handleChange}
                />
              </Col>
            </Row>

            {errors &&
              errors.map((error) => <h5 className="errors">{error.msg}</h5>)}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onSubmit={handleSubmit}
            >
              Enregistrer
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
    </>
  );
}
