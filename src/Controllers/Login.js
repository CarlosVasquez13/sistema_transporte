export default class LoginController {
  Colaborador = async (data) => {
    var url = "http://localhost:3001/api/login/colaborador";

    let res = await fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await res.json();
    if (result.Success === true) {
      window.sessionStorage.setItem("usuario", result.Items.usuario);
      window.sessionStorage.setItem("id", result.Items.id);
    }
    return result;
  };

  Transportista = async (data) => {
    var url = "http://localhost:3001/api/login/transportista";

    let res = await fetch(url, {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await res.json();
    if (result.Success === true) {
      window.sessionStorage.setItem("usuario", result.Items.usuario);
      window.sessionStorage.setItem("id", result.Items.id);
    }
    return result;
  };
}
