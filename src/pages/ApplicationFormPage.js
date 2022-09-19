import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { goBack } from "../routes/coordinator";
import useForm from "../hooks/useForm";
import Countries from "../countries/Countries";
import axios from "axios";

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

const ApplicationFormPage = () => {
  useEffect(() => {
    fetchTrips();
  }, []);

  const [tripList, setTripList] = useState([]);
  const [trip, setTrip] = useState("");

  const navigate = useNavigate();

  const { form, onChange, cleanFields } = useForm({
    name: "",
    age: "",
    applicationText: "",
    profession: "",
    country: "",
  });

  const onChangeTrip = (event) => {
    setTrip(event.target.value);
  };

  const submitApplication = (event) => {
    event.preventDefault();
    const urlApply = `https://us-central1-labenu-apis.cloudfunctions.net/labeX/rodrigo-pernambuco-shaw/trips/${trip}/apply`;
    axios
      .post(urlApply, form)
      .then(() => {
        alert("Aplicação enviada com sucesso");
        cleanFields();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchTrips = () => {
    const urlTrip =
      "https://us-central1-labenu-apis.cloudfunctions.net/labeX/rodrigo-pernambuco-shaw/trips";
    axios
      .get(urlTrip)
      .then((response) => {
        const trips = response.data.trips.map((trip) => {
          return <option value={trip.id}>{trip.name}</option>;
        });
        setTripList(trips);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const countryOption = Countries.map((country) => {
    return <option key={country.nome}>{country.nome}</option>;
  });

  return (
    <MainContainer>
      <Form>
        <h1>Inscrever-se</h1>
        <form onSubmit={submitApplication}>
          <p>
            <Select value={trip} onChange={onChangeTrip}>
              {tripList}
            </Select>
          </p>

          <p>
            <Input
              name={"name"}
              value={form.name}
              onChange={onChange}
              placeholder={"Nome"}
              required
              pattern={"^.{3,}"}
            />
          </p>

          <p>
            <Input
              name={"age"}
              value={form.age}
              onChange={onChange}
              placeholder={"Idade"}
              required
              type={"number"}
              min={18}
            />
          </p>

          <p>
            <Input
              name={"applicationText"}
              value={form.applicationText}
              onChange={onChange}
              placeholder={"Texto de Candidatura"}
              required
              pattern={"^.{30,}"}
            />
          </p>

          <p>
            <Input
              name={"profession"}
              value={form.profession}
              onChange={onChange}
              placeholder={"Profissão"}
              required
              pattern={"^.{10,}"}
            />
          </p>

          <p>
            <Select
              onChange={onChange}
              name={"country"}
              value={form.country}
              required
            >
              <option value="">Escolha um País</option>
              {countryOption}
            </Select>
          </p>

          <Button>Enviar</Button>
          <Button onClick={() => goBack(navigate)}>Voltar</Button>
        </form>
      </Form>
    </MainContainer>
  );
};

export default ApplicationFormPage;
