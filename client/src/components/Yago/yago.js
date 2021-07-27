import { render } from '@testing-library/react';
import axios from 'axios';
import React, {useState, useEffect} from 'react';



export default function Yago(){
  const [nome, setNome] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [telefone, setTelefone] = useState(undefined);
  const [cpf, setCpf] = useState(undefined);
  const [senha, setSenha] = useState(undefined);

  useEffect(
    ()=> {
      if(nome == undefined) {
        setNome(sessionStorage.getItem('nome') || '');
      }
      else{
        sessionStorage.setItem('nome', nome);
      }
    }, [nome]
  )

  useEffect(
    ()=> {
      if(telefone == undefined) {
        setTelefone(sessionStorage.getItem('telefone') || '');
      }
      else{
        sessionStorage.setItem('telefone', telefone);
      }
    }, [telefone]
  )

  useEffect(
    ()=> {
      if(cpf == undefined) {
        setCpf(sessionStorage.getItem('cpf') || '');
      }
      else{
        sessionStorage.setItem('cpf', cpf);
      }
    }, [cpf]
  )

  useEffect(
    ()=> {
      if(senha == undefined) {
        setSenha(sessionStorage.getItem('senha') || '');
      }
      else{
        sessionStorage.setItem('senha', senha);
      }
    }, [senha]
  )
  return (
  <>
    Nome: <input type="text" value = {nome} onSubmit={(event)=>setNome(event.target.value)}/>
    <br></br>
    E-mail: <input type="text" value = {email} onSubmit={(event)=>setEmail(event.target.value)}/>
    <br></br>
    Telefone: <input type="text" value = {telefone} onSubmit={(event)=>setTelefone(event.target.value)}/>
    <br></br>
    CPF: <input type="text" value = {cpf} onSubmit={(event)=>setCpf(event.target.value)}/>
    <br></br>
    Senha: <input type="text" value = {senha} onSubmit={(event)=>setSenha(event.target.value)}/>
    <br></br>
    <button type="submit" >Salvar</button>
    <br></br>
    Olá {nome} seu e-mail é {email}, telefone: {telefone}, CPF: {cpf} e senha: {senha}.
    <br></br>
  </>);
}