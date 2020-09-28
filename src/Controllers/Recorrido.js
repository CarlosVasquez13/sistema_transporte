export default class {
  newRecorrido = async (data) => {
    let idTransportista = window.sessionStorage.getItem("id");
    console.log("idTransportista", idTransportista);
    var url = "http://localhost:3001/api/recorrido/nuevo-recorrido";

    let res = await fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify({
        idSucursal: data.idSucursal,
        Colaboradores: data.Colaboradores,
        idTransportista: idTransportista,
      }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await res.json();
    console.log(result);
    return result;
  };

  reportTransportista = async (data) => {
    var url = "http://localhost:3001/api/transportista/reporte";

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
}
