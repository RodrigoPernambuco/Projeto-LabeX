import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { goBack, goToApplicationForm } from "../routes/coordinator";

const MainContainer = styled.div`
  font-family: 'Kanit', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Header = styled.div`
  text-align: center;
  padding: 200px;
`

const Button = styled.button`
  margin-right: 10px;
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

const Card = styled.div`
  padding: 40px;
  margin-top: 50px;
  width: 50%;
  box-shadow: rgb(0 0 0 / 80%) 0px 8px 16px 0px;
`

const ListTripPage = () => {
  const [tripList, setTripList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const urlTrip =
      "https://us-central1-labenu-apis.cloudfunctions.net/labeX/rodrigo-pernambuco-shaw/trips";
    axios
      .get(urlTrip)
      .then((response) => {
        setTripList(response.data.trips);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const trips = tripList.map((trip) => {
    return (
      <Card>
        <p><b>Name:</b> {trip.name}</p>
        <p><b>Planeta:</b> {trip.planet}</p>
        <p><b>Descrição:</b> {trip.description}</p>
        <p><b>Data:</b> {trip.date}</p>
        <p><b>Duração:</b> {trip.durationInDays}</p>
      </Card>
    );
  });

  return (
    <MainContainer>
      <Header>
        <h1>Lista de Viagem</h1>
        <Button onClick={() => goBack(navigate)}>Voltar</Button>
        <Button onClick={() => goToApplicationForm(navigate)}>Inscrever</Button>
      </Header>
        {trips}
    </MainContainer>
  );
};

export default ListTripPage;
