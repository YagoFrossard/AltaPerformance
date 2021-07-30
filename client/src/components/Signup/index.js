import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Signup() {
  const [nome, setNome] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [telefone, setTelefone] = useState(undefined);
  const [cpf, setCpf] = useState(undefined);
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
      if (cpf == undefined) {
        setCpf(sessionStorage.getItem('cpf') || '');
      }
      else {
        sessionStorage.setItem('cpf', cpf);
      }
    }, [cpf]
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
      cpf: cpf,
      user_type: "ALUNO"
    }

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data))
  }

  return (
    <>
      Nome: <input type="text" value={nome} onChange={(event) => setNome(event.target.value)} />
      <br></br>
      E-mail: <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
      <br></br>
      Telefone: <input type="text" value={telefone} onChange={(event) => setTelefone(event.target.value)} />
      <br></br>
      CPF: <input type="text" value={cpf} onChange={(event) => setCpf(event.target.value)} />
      <br></br>
      Senha: <input type="text" value={senha} onChange={(event) => setSenha(event.target.value)} />
      <br></br>
      <button type="submit" onClick={onSubmit}>Salvar</button>
      <br></br>
      Olá {nome} seu e-mail é {email}, telefone: {telefone}, CPF: {cpf} e senha: {senha}.
      <br></br>
    </>);
}