import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { goBack, goToListTripPage } from "../routes/coordinator";
import useAuthorization from "../hooks/useAuthorization";

const Card = styled.div`
  border: 1px solid black;
  margin: 4px;
  padding: 10px;
`;

const Header = styled.h1`
  display: flex;
  justify-content: column;
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
      .then((response) => {
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
    <div>
      <Header>
        {detailHeader.name}
        <button onClick={() => goBack(navigate)}>Voltar</button>
      </Header>
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
    </div>
  );
};

export default TripDetailsPage;
