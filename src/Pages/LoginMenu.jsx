import { Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const LoginMenu = (props) => {
  const history = useHistory();

  const goToColaborador = () => {
    history.push("/login/colaborador");
  };

  const goToTransp = () => {
    history.push("/login/transportista");
  };
  return (
    <div className="d-block mt-4">
      <h1>Iniciar Sesión</h1>
      <Button
        variant="contained"
        onClick={goToColaborador}
        color="primary"
        className="mr-3"
      >
        Colaborador
      </Button>
      <Button
        variant="contained"
        onClick={goToTransp}
        color="primary"
        className="ml-3"
      >
        Transportista
      </Button>
    </div>
  );
};

export default LoginMenu;
