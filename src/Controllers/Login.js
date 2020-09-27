export default class LoginController {
  Colaborador = async (data) => {
    console.log("data", data);
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
    console.log(result);
    return result;
    /* 
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        console.log("Success:", response);
        if (response.Success === true) {
          window.sessionStorage.setItem("usuario", response.Items.usuario);
          window.sessionStorage.setItem("id", response.Items.id);
          return response;
        }
      }); */
  };
}
