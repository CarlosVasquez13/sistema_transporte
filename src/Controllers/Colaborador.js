export default class ColaboradorController {
  getList = async () => {
    let url = "http://localhost:3001/api/colaborador/lista";

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
