import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { goToHomePage, goToAdminHomePage } from "../routes/coordinator";
import useForm from "../hooks/useForm";

const MainContainer = styled.div`
  font-family: "Kanit", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const Input = styled.input`
  width: 475px;
  padding: 10px;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px;
`;

const Button = styled.button`
  margin-right: 10px;
  border: none;
  padding: 15px 40px;
  border-radius: 25%;
  background-color: black;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: grey;
    color: black;
  }
`;

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      goToAdminHomePage(navigate);
    }
  }, []);

  const { form, onChange, cleanFields } = useForm({
    email: "",
    password: "",
  });

  const singIn = (event) => {
    event.preventDefault();
    const url =
      "https://us-central1-labenu-apis.cloudfunctions.net/labeX/rodrigo-pernambuco-shaw/login";
    axios
      .post(url, form)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        goToAdminHomePage(navigate);
      })
      .catch(() => {
        alert("Você não tem permissão");
        cleanFields();
      });
  };

  return (
    <MainContainer>
      <h1>Página de Login</h1>
      <Form>
        <form onSubmit={singIn}>
          <Input
            name={"email"}
            value={form.email}
            onChange={onChange}
            placeholder={"E-mail"}
            required
            type={"email"}
          />
          <Input
            name={"password"}
            value={form.password}
            onChange={onChange}
            placeholder={"Senha"}
            required
            type={"password"}
          />
          <ButtonContainer>
            <Button>Entrar</Button>
            <Button onClick={() => goToHomePage(navigate)}>Voltar</Button>
          </ButtonContainer>
        </form>
      </Form>
    </MainContainer>
  );
};

export default LoginPage;
