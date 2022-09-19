import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { goToLogin } from "../routes/coordinator";

const useAuthorization = () => {
  const navigate = useNavigate();
  const {token} = localStorage

  useEffect(() => {
    if (token === null || token === undefined) {
      goToLogin(navigate);
    }
  }, []);

  return token;
};

export default useAuthorization;
