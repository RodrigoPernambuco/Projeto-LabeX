import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  goToAdminCreateTrip,
  goToHomePage,
  goToLogin,
  goToAdminTripDetail,
} from "../routes/coordinator";
import useAuthorization from "../hooks/useAuthorization";
import axios from "axios";

const MainContainer = styled.div`
  font-family: "Kanit", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
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

const Text = styled.h1`
  text-align: center;
`

const Card = styled.div`
  display: flex;
  box-shadow: rgb(0 0 0 / 70%) 0px 8px 16px 0px;
  align-items: center;
  padding: 15px 30px;
  justify-content: space-between;
  margin: 20px;
`

const DeleteButton = styled.div`
  background-color: red;
  border: 1px solid black;
  color: black;
  cursor: pointer;
  padding: 20px;
  border-radius: 30%;
  &:hover{
    background-color: grey;
    color: red;
  }
`

const AdminHomePage = () => {
  const [tripList, setTripList] = useState([]);

  const navigate = useNavigate();

  const token = useAuthorization();

  useAuthorization();

  useEffect(() => {
    cardTrip();
  }, []);

  const cardTrip = () => {
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
  };

  const deleteTrip = (id) => {
    const urlDelete = `https://us-central1-labenu-apis.cloudfunctions.net/labeX/rodrigo-pernambuco-shaw/trips/${id}`;
    axios
      .delete(urlDelete, {
        headers: {
          auth: token,
        },
      })
      .then(() => {
        cardTrip();
        alert('Viagem deletada com sucesso')
        // onClickTrip(response.data.id)
        // setTripId(response.data.id)
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  const onClickTripDetail = (id) => {
    goToAdminTripDetail(navigate, id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    goToLogin(navigate);
  };

  const tripCard = tripList.map((trip) => {
    return (
      <Card value={trip.id}>
        <p onClick={() => onClickTripDetail(trip.id)} style={{cursor:'pointer'}}><b>{trip.name}</b></p>        
        <DeleteButton value={trip.id} onClick={() => deleteTrip(trip.id)}>
          <b>Delete</b>
        </DeleteButton>
      </Card>
    );
  });

  return (
    <MainContainer>
      <Text>Painel Administrativo</Text>
      <ButtonSection>
        <Button onClick={() => goToAdminCreateTrip(navigate)}>
          Criar Viagem
        </Button>
        <Button onClick={() => goToHomePage(navigate)}>Voltar</Button>
        <Button onClick={logout}>Logout</Button>
      </ButtonSection>
      {tripCard}
    </MainContainer>
  );
};

export default AdminHomePage;
