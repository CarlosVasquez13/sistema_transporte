/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import SucursalController from "../Controllers/Sucursales";
import RecorridoController from "../Controllers/Recorrido";
import { useForm } from "react-hook-form";

const NewRecorrido = () => {
  const [Colaboradores, setColaboradores] = useState({
    load: false,
    items: [],
  });
  const [Selected, setSelected] = useState({ value: false, items: [] });

  const [open, setOpen] = useState(false);
  const params = useParams();
  const { handleSubmit } = useForm();

  const [checked, setChecked] = useState([]);
  const history = useHistory();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    const newSelected = [];
    Colaboradores.items.forEach((user) => {
      newChecked.forEach((element) => {
        if (user.id === element) {
          newSelected.push(user);
          console.log("coninciden", element, user.id);
          setSelected({
            value: true,
            items: newSelected,
          });
        }
      });
    });
  };

  const getColaboradores = async () => {
    const sucursal = new SucursalController();
    const result = await sucursal.getColaboradores(params.idSucursal);
    console.log("result", result);
    if (result.Success) {
      if (result.Items.length !== 0) {
        setColaboradores({
          load: true,
          items: result.Items,
        });
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    if (checked.length !== 0) {
      const recorrido = new RecorridoController();
      const result = await recorrido.newRecorrido({
        idSucursal: params.idSucursal,
        Colaboradores: checked,
      });
      console.log("result", result);
      history.replace("/main/transportista");
    }
  };

  useEffect(() => {
    getColaboradores();
  }, []);

  return (
    <div>
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <h3>Nuevo recorrido sucursal {params.nombre}</h3>
        <Grid container spacing={3} alignItems="center" className="d-flex">
          <Grid item lg={10} className="mx-auto">
            <Button
              variant="outlined"
              onClick={handleOpen}
              style={{ width: "40%" }}
              color="secondary"
            >
              Seleccionar usuarios{`(${checked.length})`}
            </Button>
          </Grid>
          <Grid item lg={8} className="mx-auto">
            <List
              component="div"
              aria-label="secondary"
              className="bg-gray d-flex"
            >
              {Selected.value &&
                Selected.items.map((element) => (
                  <ListItem className="border border-primary mx-3 d-block">
                    <ListItemText primary={`Usuario: ${element.nombre}`} />
                    <ListItemText primary={`Direccion: ${element.direccion}`} />
                    <ListItemText
                      primary={`Distancia: ${element.distancia} km`}
                    />
                  </ListItem>
                ))}
            </List>
          </Grid>
          <Grid item lg={10} className="mx-auto">
            <Button
              variant="contained"
              type="submit"
              color="primary"
              style={{ width: "40%" }}
            >
              Registrar Recorrido
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
          Selecciona los usuarios
        </DialogTitle>
        {Colaboradores.load ? (
          Colaboradores.items.map((element) => (
            <ListItem key={element.id} button>
              <ListItemAvatar>
                <Avatar
                  alt={element.nombre}
                  src={`/static/images/avatar.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={element.id} primary={element.nombre} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={handleToggle(element.id)}
                  checked={checked.indexOf(element.id) !== -1}
                  inputProps={{ "aria-labelledby": element.id }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))
        ) : (
          <span>No hay usuarios para esta sucursal</span>
        )}
      </Dialog>
    </div>
  );
};

export default NewRecorrido;
