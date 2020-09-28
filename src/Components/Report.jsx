import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";

const ReportTransp = ({ Report }) => {
  const splitDate = (date) => {
    const temp = date.split("T");
    return temp[0];
  };
  const calTotal = () => {
    let total = 0;
    Report.forEach((element) => {
      total += element.tarifa;
    });
    return total;
  };

  return (
    <TableContainer component={Paper}>
      <Toolbar className="d-flex justify-content-between">
        <Typography color="inherit" variant="h4" component="div">
          Reporte
        </Typography>
        <Typography variant="h6" id="tableTitle" component="div">
          Total : Lp.{calTotal()}
        </Typography>
      </Toolbar>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Usuario</TableCell>
            <TableCell align="right">Fecha</TableCell>
            <TableCell align="right">Distancia</TableCell>
            <TableCell align="right">Tarifa</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Report.map((recorrido) => (
            <TableRow key={recorrido.id}>
              <TableCell component="th" scope="recorrido">
                {recorrido.nombre}
              </TableCell>
              <TableCell align="right">{splitDate(recorrido.fecha)}</TableCell>
              <TableCell align="right">{recorrido.distancia}</TableCell>
              <TableCell align="right">{recorrido.tarifa}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportTransp;
