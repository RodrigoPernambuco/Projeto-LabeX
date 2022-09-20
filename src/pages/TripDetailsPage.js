import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { goBack, goToListTripPage } from "../routes/coordinator";
import useAuthorization from "../hooks/useAuthorization";

const MainContainer = styled.div`
  font-family: "Kanit", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
`;

const Card = styled.div`
  padding: 40px;
  margin-top: 50px;
  width: 50%;
  box-shadow: rgb(0 0 0 / 80%) 0px 8px 16px 0px;
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

const TripDetailsPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [detailHeader, setDetailHeader] = useState({ approved: [] });

  const navigate = useNavigate();

  const { id } = useParams();

  const token = useAuthorization();

  useEffect(() => {
    tripDetail();
  }, []);

  const tripDetail = () => {
    const urlDetail = `https://us-central1-labenu-apis.cloudfunctions.net/labeX/rodrigo-pernambuco-shaw/trip/${id}`;
    axios
      .get(urlDetail, {
        headers: {
          auth: token,
        },
      })
      .then((response) => {
        setCandidates(response.data.trip.candidates);
        setDetailHeader(response.data.trip);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const decideCandidate = (studentId, approve) => {
    const urlDecide = `https://us-central1-labenu-apis.cloudfunctions.net/labeX/rodrigo-pernambuco-shaw/trips/${id}/candidates/${studentId}/decide`;
    const body = {
      approve: approve,
    };
    axios
      .put(urlDecide, body, {
        headers: {
          auth: token,
        },
      })
      .then(() => {
        tripDetail();
        approve
          ? alert("Seu candidato foi aprovado")
          : alert("Seu candidato foi reprovado");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const decidedCandidates = detailHeader.approved.map((decide) => {
    return <li>{decide.name}</li>;
  });

  const printCandidates = candidates.map((candidate) => {
    return (
      <Card>
        <p>
          <b>Nome:</b> {candidate.name}
        </p>
        <p>
          <b>Profissão:</b> {candidate.profession}
        </p>
        <p>
          <b>Idade:</b> {candidate.age}
        </p>
        <p>
          <b>País:</b> {candidate.country}
        </p>
        <p>
          <b>Texto de Candidatura:</b> {candidate.applicationText}
        </p>

        <button onClick={() => decideCandidate(candidate.id, true)}>
          Aprovar
        </button>
        <button onClick={() => decideCandidate(candidate.id, false)}>
          Reprovar
        </button>
      </Card>
    );
  });

  return (
    <MainContainer>
      <h1>{detailHeader.name}</h1>
      <Button onClick={() => goBack(navigate)}>Voltar</Button>

      <Card>
        <p>
          <b>Nome:</b> {detailHeader.name}
        </p>
        <p>
          <b>Descrição:</b> {detailHeader.description}
        </p>
        <p>
          <b>Planeta:</b> {detailHeader.planet}
        </p>
        <p>
          <b>Duração:</b> {detailHeader.durationInDays}
        </p>
        <p>
          <b>Data:</b> {detailHeader.date}
        </p>
      </Card>

      <div>{printCandidates}</div>
      <div>{decidedCandidates}</div>
    </MainContainer>
  );
};

export default TripDetailsPage;
