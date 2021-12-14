import axios from 'axios';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dashboard from '../../pages/Dashboard/Dashboard';
import link from '../../envClient';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(15),
    display: 'flex-start',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '10px',
  },

  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  cancelar: {
    backgroundColor: '#FABEC0',
    color: 'red',
    width: '109px',
    height: '38px',
    radius: '5px',
    marginLeft: theme.spacing(0),
    marginTop: theme.spacing(1),
  },
  salvar: {
    width: '109px',
    height: '38px',
    radius: '5px',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(0),
    marginTop: theme.spacing(1),
  }
}));

export default function Signup() {
  const classes = useStyles();
  const [nome, setNome] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [telefone, setTelefone] = useState(undefined);
  const [senha, setSenha] = useState(undefined);

  useEffect(
    () => {
      if (nome == undefined) {
        setNome(sessionStorage.getItem('nome') || '');
      }
      else {
        sessionStorage.setItem('nome', nome);
      }
    }, [nome]
  )

  useEffect(() => {
    document.body.style.background = 'white'
  }, [])

  useEffect(
    () => {
      if (email == undefined) {
        setEmail(sessionStorage.getItem('email') || '');
      }
      else {
        sessionStorage.setItem('email', email);
      }
    }, [email]
  )

  useEffect(
    () => {
      if (telefone == undefined) {
        setTelefone(sessionStorage.getItem('telefone') || '');
      }
      else {
        sessionStorage.setItem('telefone', telefone);
      }
    }, [telefone]
  )

  useEffect(
    () => {
      if (senha == undefined) {
        setSenha(sessionStorage.getItem('senha') || '');
      }
      else {
        sessionStorage.setItem('senha', senha);
      }
    }, [senha]
  )

  const onSubmit = () => {
    const user = {
      email: email,
      password: senha,
      name: nome,
      telephone_number: telefone,
      user_type: "PROFESSOR"
    }

    axios.post(`${link}/users/add`, user)
      .then(res => console.log(res.data))
  }

  return (
    <div>
      <Dashboard></Dashboard>
      <Container
        component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" color="initial">
            Cadastrar Professor
          </Typography>
          <TextField
            type="text"
            value={nome}
            label="Nome"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(event) => setNome(event.target.value)} />
          <br></br>
          <TextField
            type="text"
            value={email}
            label="E-mail"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(event) => setEmail(event.target.value)} />
          <br></br>
          <TextField
            type="text"
            value={telefone}
            label="Telefone"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(event) => setTelefone(event.target.value)} />
          <br></br>
          <TextField
            type="text"
            value={senha}
            label="Senha"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={(event) => setSenha(event.target.value)} />
          <br></br>
          <Button type="submit"
            fullWidth
            size="small"
            variant="contained"
            color="secondary"
            className={classes.cancelar}
          >Cancelar</Button>
          <Button type="submit"
            fullWidth
            size="small"
            variant="contained"
            color="secondary"
            className={classes.salvar}
            onClick={onSubmit}>Salvar</Button>
          <br></br>
          <br></br>
        </div>
      </Container>
    </div>);
}