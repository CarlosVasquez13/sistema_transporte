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
      <h1 className="mt-4">Sucursales</h1>
      <List component="nav" aria-label="secondary" className="d-flex">
        {Data.load &&
          Data.items.map((sucursal) => <SucursalDialog sucursal={sucursal} />)}
      </List>
    </div>
  );
};

export default Sucursales;
