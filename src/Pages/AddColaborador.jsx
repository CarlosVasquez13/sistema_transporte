import {
  Button,
  Dialog,
  DialogTitle,
  Grid,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import ColaboradorController from "../Controllers/Colaborador";
import SucursalController from "../Controllers/Sucursales";

const AddColaborador = () => {
  const [Data, setData] = useState({ load: false, items: [] });
  const [SelectedCol, setSelectedCol] = useState({ value: false, user: {} });
  const [open, setopen] = useState(false);
  const [FailResult, setFailResult] = useState({ value: false, message: "" });
  const { register, handleSubmit, errors } = useForm();
  const params = useParams();

  const handleClose = () => {
    setopen(false);
  };

  const handleOpen = () => {
    setopen(true);
  };
  const getLisUsers = async () => {
    const colabor = new ColaboradorController();
    const result = await colabor.getList();
    setData({
      load: true,
      items: result.Items,
    });
  };

  const selectColaborador = (user) => {
    setSelectedCol({
      value: true,
      user: user,
    });
    setopen(false);
    setFailResult({
      value: false,
      message: "",
    });
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const sucursal = new SucursalController();
    const result = await sucursal.newColaborador({
      idSucursal: params.idSucursal,
      idUsuario: SelectedCol.user.id,
      distancia: data.distancia,
    });
    if (!result.Success) {
      setFailResult({
        value: true,
        message: result.Response,
      });
    } else {
      alert("Usuario agregado.");
    }
  };

  useEffect(() => {
    getLisUsers();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <h1>agregar colaborador</h1>
        <Grid
          container
          direction="column"
          justify
          alignContent="center"
          spacing={3}
        >
          <Grid item>
            <Typography component="span">
              Colaborador: {SelectedCol.value && SelectedCol.user.nombre}
            </Typography>
          </Grid>

          <Grid item>
            <Button variant="outlined" color="primary" onClick={handleOpen}>
              {SelectedCol.value
                ? "Cambiar colaborador"
                : "Seleccionar colaborador"}
            </Button>
          </Grid>
          <Grid item lg={6}>
            <TextField
              style={{ width: "100%" }}
              id="standard-basic"
              label="Distancia del recorrido(km)"
              name="distancia"
              inputRef={register({
                required: {
                  value: true,
                  message: "Ingresa la distancia sucursal -> casa colaborador.",
                },
                pattern: {
                  value: /^\d*(\.\d{0,2})?$/,
                  message: "solo puede contener números",
                },
              })}
            />
            <div>
              <span className="text-danger text-small mb-0">
                {errors?.distancia?.message}
              </span>
            </div>
          </Grid>
          <Grid item lg={6}>
            <div>
              <span className="text-danger text-small mb-0">
                {FailResult.value && FailResult.message}
              </span>
            </div>
            <Button
              disabled={SelectedCol.value ? false : true}
              type="submit"
              variant="contained"
              color="primary"
              className="btn-block mt-4"
            >
              Agregar
            </Button>
          </Grid>
        </Grid>
      </form>

      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">
          Selecciona el colaborador
        </DialogTitle>

        {Data.load &&
          Data.items.map((element) => (
            <ListItem
              button
              component="button"
              onClick={() => selectColaborador(element)}
            >
              <ListItemText primary={element.nombre} />
            </ListItem>
          ))}
      </Dialog>
    </div>
  );
};

export default AddColaborador;
