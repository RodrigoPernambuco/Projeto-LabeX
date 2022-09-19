import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { goBack, goToLogin } from "../routes/coordinator";
import useForm from "../hooks/useForm";
import axios from "axios";
import useAuthorization from "../hooks/useAuthorization";

const MainContainer = styled.div`
  font-family: "Kanit", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;

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

const Input = styled.input`
  width: 475px;
  padding: 10px;
`

const Select = styled.select`
  width: 500px;
  padding: 10px;
`

const CreateTripPage = () => {
  const navigate = useNavigate();

  const token = useAuthorization();

  const { form, onChange, cleanFields } = useForm({
    name: "",
    planet: "",
    date: "",
    description: "",
    durationInDays: "",
  });

  const createTrip = (event) => {
    event.preventDefault();
    const urlCreate =
      "https://us-central1-labenu-apis.cloudfunctions.net/labeX/rodrigo-pernambuco-shaw/trips";
    axios
      .post(urlCreate, form, {
        headers: {
          auth: token,
        },
      })
      .then(() => {
        alert("Viagem criada com sucesso");
        cleanFields();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const today = () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month.toString().padStart(2, "0")}-${day}`;
  };

  return (
    <MainContainer>
      <h1><b>Criar Viagem</b></h1>
      <Form>
      <form onSubmit={createTrip}>
        <p>
          <Input
            name={"name"}
            value={form.name}
            onChange={onChange}
            placeholder={"Nome do Evento"}
            required
            pattern={"^.{3,}"}
            title={"Mínimo de 3 caractéres"}
          />
        </p>

        <p>
          <Select
            onChange={onChange}
            name={"planet"}
            value={form.planet}
            required
          >
            <option value="">Escolha um Planeta</option>
            <option>Mercúrio</option>
            <option>Vênus</option>
            <option>Terra</option>
            <option>Marte</option>
            <option>Júpiter</option>
            <option>Saturno</option>
            <option>Urano</option>
            <option>Netuno</option>
          </Select>
        </p>

        <p>
          <Input
            name={"date"}
            value={form.date}
            onChange={onChange}
            placeholder={"Data da Viagem"}
            required
            type={"date"}
            min={today()}
          />
        </p>

        <p>
          <Input
            name={"description"}
            value={form.description}
            onChange={onChange}
            placeholder={"Descrição da Viagem"}
            required
            pattern={"^.{30,}"}
            title={"Mínimo de 30 caractéres"}
          />
        </p>

        <p>
          <Input
            name={"durationInDays"}
            value={form.durationInDays}
            onChange={onChange}
            placeholder={"Duração em Dias"}
            required
            min={50}
            type={"number"}
            title={"Mínimo de 50 dias"}
          />
        </p>

        <Button>Criar</Button>
        <Button onClick={() => goBack(navigate)}>Voltar</Button>
      </form>
      </Form>
    </MainContainer>
  );
};

export default CreateTripPage;
