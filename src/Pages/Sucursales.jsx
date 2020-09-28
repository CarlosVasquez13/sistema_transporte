import { Grid, List } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SucursalDialog from "../Components/SucursalDialog";
import SucursalController from "../Controllers/Sucursales";

const Sucursales = () => {
  const [Data, setData] = useState({ load: false, items: "" });

  const getList = async () => {
    const sucursal = new SucursalController();

    const result = await sucursal.getList();
    setData({
      load: true,
      items: result.Items,
    });
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <h1>Sucursales</h1>
      <Grid container justify="center">
        <List component="nav" aria-label="secondary mailbox folders">
          {Data.load &&
            Data.items.map((sucursal) => (
              <SucursalDialog sucursal={sucursal} />
            ))}
        </List>
      </Grid>
    </div>
  );
};

export default Sucursales;
