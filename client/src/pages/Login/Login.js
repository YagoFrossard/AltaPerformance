import React, { Component, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo_alta from '../../assets/logo_alta.png'
import Footer from '../../components/Footer'
import { Link as LinkRouter, useHistory, Redirect } from 'react-router-dom';
import axios from 'axios';
import {login} from "../../services/auth.service";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://altaperformance.esp.br/" target="_blank">
        AltaPerformance
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex-start',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '25px',
    borderRadius: '10px',
    backgroundColor: 'white'
  },
  entrar: {
    marginTop: theme.spacing(3)
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [redirect, setRedirect] = useState(false);
  let history = useHistory();

  useEffect(
    () => {
      setEmail(email);
    }, [email]
  )

  useEffect(() => { 
    document.body.style.background = 'linear-gradient(165deg, rgba(255,229,228,1) 0%, rgba(232,239,197,1) 100%)' 
  }, [])

  useEffect(
    () => {
      setPassword(password);
    }, [password]
  )


  const onSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password
    };

    axios.post('https://alta-performance.herokuapp.com/user/login', loginData, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
      .then((response) => {
        if (response.data.token) {
          login(JSON.stringify(response.data));
        }
        history.push('/dashboard');
        return response.data;
      })
      .catch(err => console.log(err));
  }

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container justify="center">
            <LinkRouter to="/login">
              <img src={logo_alta} alt="Logo Alta Performance"></img>
            </LinkRouter>
          </Grid>
          <Typography className={classes.entrar} component="h1" variant="h5">
            Entrar
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Endereço de e-mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="secondary" />}
              label="Salvar dados"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={onSubmit}
            >
              Avançar
            </Button>
            <Grid container direction="column">
              <Grid item>
                {"Não tem uma conta? "}
                <Link color="secondary" href="#" variant="body2">
                  Solicite uma!
                </Link>
              </Grid>
              <Grid item xs>
                <Link color="secondary" href="#" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      <Footer />
    </div>
  );
}