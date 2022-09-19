import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { goToListTripPage, goToLogin } from "../routes/coordinator";

const MainContainer = styled.div`
  font-family: 'Kanit', sans-serif;
  width: 100%;
`

const Home = styled.div`
  text-align: center;
  padding-top: 150px;
`

const ButtonSection = styled.div`
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  padding-top: 10%;
`

const Button = styled.button`
  border: none;
  padding: 15px 40px;
  border-radius: 25%;
  background-color: black;
  color: white;
  cursor: pointer;
  &:hover{
    background-color: grey;
    color: black;
  }
`

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <MainContainer>
      <Home>
        <h1>LabeX</h1>
      </Home>
      <ButtonSection>
        <Button onClick={() => goToListTripPage(navigate)}>
          <b>Lista de Viagem</b>
        </Button>
        <Button onClick={() => goToLogin(navigate)}>
          <b>Área de Admin</b>
        </Button>
      </ButtonSection>
    </MainContainer>
  );
};

export default HomePage;
