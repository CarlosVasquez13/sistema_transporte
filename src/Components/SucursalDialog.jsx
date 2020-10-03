import { Dialog, DialogTitle, ListItem, ListItemText } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SucursalDialog = ({ sucursal }) => {
  const [open, setopen] = useState(false);

  const handleClose = () => {
    setopen(false);
  };

  const handleOpen = () => {
    setopen(true);
  };

  return (
    <React.Fragment>
      <ListItem
        button
        component="button"
        onClick={handleOpen}
        style={{ width: "25%" }}
        className="border border-primary mx-auto d-block"
      >
        <ListItemText primary={sucursal.nombre} />
        <ListItemText primary={sucursal.direccion} />
      </ListItem>

      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <DialogTitle id="simple-dialog-title">Opciones</DialogTitle>
        <Link
          to={`/sucursal/${sucursal.id}/add`}
          style={{ textDecoration: "none" }}
        >
          <ListItem button component="button">
            <ListItemText primary="Agregar colaborador" />
          </ListItem>
        </Link>
      </Dialog>
    </React.Fragment>
  );
};

export default SucursalDialog;
