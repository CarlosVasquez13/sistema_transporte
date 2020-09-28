import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SucursalController from "../Controllers/Sucursales";

const MainTransportista = () => {
  const [open, setopen] = useState(false);
  const [Sucursales, setSucursales] = useState({ load: true, items: [] });

  const getSucursales = async () => {
    const sucursal = new SucursalController();
    const result = await sucursal.getList();
    if (result.Success) {
      setSucursales({
        load: true,
        items: result.Items,
      });
    }
    console.log("result", result);
  };
  const handleClose = () => {
    setopen(false);
  };

  const handleOpen = () => {
    setopen(true);
  };
  useEffect(() => {
    getSucursales();
  }, []);

  return (
    <div>
      <h1>Colaboradores</h1>
      <Grid container direction="column" spacing={4} alignContent="center">
        <Grid item lg={5}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleOpen}
            className="btn-block"
          >
            Ingresar Recorrido
          </Button>
        </Grid>
        <Grid item lg={5}>
          <Button variant="outlined" color="secondary" className="btn-block">
            Reporte transportista
          </Button>
        </Grid>
      </Grid>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">
          Selecciona la sucursal
        </DialogTitle>
        {Sucursales.load &&
          Sucursales.items.map((element) => (
            <Link
              to={`/transportista/nuevo-recorrido/${element.id}/${element.nombre}`}
              style={{ textDecoration: "none" }}
            >
              <ListItem button component="button">
                <ListItemText primary={element.nombre} />
              </ListItem>
            </Link>
          ))}
      </Dialog>
    </div>
  );
};

export default MainTransportista;
