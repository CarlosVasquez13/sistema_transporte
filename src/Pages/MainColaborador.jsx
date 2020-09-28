import { Button, Grid } from "@material-ui/core";
import React from "react";
import { Link, useHistory } from "react-router-dom";

const MainColaborador = () => {
  const history = useHistory();

  const onSucursal = () => {
    history.push("/sucursal");
  };

  return (
    <div>
      <h1>Colaboradores</h1>
      <Grid
        container
        direction="column"
        spacing={5}
        alignContent="center"
        justify
      >
        <Grid item lg={5}>
          <Link to="/sucursal">
            <Button variant="outlined" color="secondary" className="btn-block">
              Sucursales
            </Button>
          </Link>
        </Grid>
        <Grid item lg={5}>
          <Link to="/mainReport">
            <Button variant="outlined" color="secondary" className="btn-block">
              Reporte transportista
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainColaborador;
