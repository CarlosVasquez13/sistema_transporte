export default class SucursalController {
  getList = async () => {
    var url = "http://localhost:3001/api/sucursal/lista";

    let res = await fetch(url, {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await res.json();
    return result;
  };

  newColaborador = async (data) => {
    var url = "http://localhost:3001/api/sucursal/colaborador_sucursal";

    let res = await fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await res.json();
    return result;
  };

  getColaboradores = async (id) => {
    var url = `http://localhost:3001/api/sucursal/colaboradores/${id}`;

    let res = await fetch(url, {
      method: "GET", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await res.json();
    return result;
  };
}
