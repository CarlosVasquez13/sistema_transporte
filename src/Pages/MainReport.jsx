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
import TransportistaController from "../Controllers/Tranportista";
import RecorridoController from "../Controllers/Recorrido";
import ReportTransp from "../Components/Report";

const MainReport = () => {
  const { register, handleSubmit, errors } = useForm();
  const [open, setopen] = useState(false);
  const [Transportistas, setTransportistas] = useState({
    load: false,
    items: [],
  });
  const [TrsptaSelected, setTrsptaSelected] = useState({
    value: false,
    user: {},
  });
  const [Report, setReport] = useState({ load: false, items: [] });

  const handleClose = () => {
    setopen(false);
  };

  const handleOpen = () => {
    setopen(true);
  };

  const selectTransportista = (element) => {
    setTrsptaSelected({
      value: true,
      user: element,
    });
    handleClose();
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const recorridoTranspta = new RecorridoController();
    const result = await recorridoTranspta.reportTransportista({
      idTransportista: TrsptaSelected.user.id,
      fechaInicial: data.fechaInicial,
      fechaFinal: data.fechaFinal,
    });
    if (!result.Error) {
      setReport({
        load: true,
        items: result.Items,
      });
    } else {
      setReport({
        load: false,
        items: [],
      });
      alert("Este transportista no tiene recorridos registrados.");
    }
  };

  const getTranspList = async () => {
    const controller = new TransportistaController();
    const result = await controller.getList();
    if (result.Success) {
      setTransportistas({
        load: true,
        items: result.Items,
      });
    }
  };

  useEffect(() => {
    getTranspList();
  }, []);

  return (
    <div>
      <h4 className="border-bottom mt-5 mb-4 border-green">
        Reporte Recorridos
      </h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          direction="column"
          justify
          alignItems="center"
          border-bottom
          border-success
        >
          <Grid item lg={8} className="d-flex mx-auto mb-3">
            {TrsptaSelected.value && (
              <Typography>{TrsptaSelected.user.nombre}</Typography>
            )}
            <Button
              onClick={handleOpen}
              variant="contained"
              color="secondary"
              className="ml-3"
            >
              {TrsptaSelected.value
                ? "✎ Transportista"
                : "Seleccionar trasportista"}
            </Button>
          </Grid>
          <Grid item lg={8} className="d-flex border border-danger mb-2">
            <Grid item lg={4} md={3} sm={4} xs={6} className="mx-auto">
              <span style={{ color: "#007bff", fontSize: "12px" }}>
                Fecha Inicial
              </span>
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                // label="Fecha de Factura"
                type="date"
                color="primary"
                name="fechaInicial"
                autoComplete="off"
                inputRef={register({
                  required: {
                    value: true,
                    message: "Selecciona una fecha valida!.",
                  },
                })}
              />
              <div>
                <span className="text-danger text-small mb-0">
                  {errors?.fechaInicial?.message}
                </span>
              </div>
            </Grid>
            <Grid item lg={4} md={3} sm={4} xs={6} className="mx-auto mb-3">
              <span style={{ color: "#007bff", fontSize: "12px" }}>
                Fecha Final
              </span>
              <TextField
                style={{ width: "100%" }}
                id="standard-basic"
                type="date"
                color="primary"
                name="fechaFinal"
                autoComplete="off"
                inputRef={register({
                  required: {
                    value: true,
                    message: "Selecciona una fecha valida!.",
                  },
                })}
              />
              <div>
                <span className="text-danger text-small mb-0">
                  {errors?.fechaFinal?.message}
                </span>
              </div>
            </Grid>
          </Grid>
          <Grid item lg={5}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={TrsptaSelected.value ? false : true}
            >
              Generar Reporte
            </Button>
          </Grid>
        </Grid>
      </form>
      {Report.load && (
        <Grid item lg={6} className="mx-auto mt-4">
          <ReportTransp Report={Report.items} />
        </Grid>
      )}
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">
          Selecciona el colaborador
        </DialogTitle>

        {Transportistas.load &&
          Transportistas.items.map((element) => (
            <ListItem
              button
              component="button"
              onClick={() => selectTransportista(element)}
            >
              <ListItemText primary={element.nombre} />
            </ListItem>
          ))}
      </Dialog>
    </div>
  );
};

export default MainReport;
