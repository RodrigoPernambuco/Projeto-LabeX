import React, { useState, useEffect } from "react";
// import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { goBack, goToAdminHomePage } from "../routes/coordinator";
import useForm from "../hooks/useForm";

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
    <div>
      <p>Página de Login</p>
      <form onSubmit={singIn}>
        <input
          name={"email"}
          value={form.email}
          onChange={onChange}
          placeholder={"E-mail"}
          required
          type={"email"}
        />
        <input
          name={"password"}
          value={form.password}
          onChange={onChange}
          placeholder={"Senha"}
          required
          type={"password"}
        />
        <button>Entrar</button>
      </form>
      <button onClick={() => goBack(navigate)}>Voltar</button>
    </div>
  );
};

export default LoginPage;
