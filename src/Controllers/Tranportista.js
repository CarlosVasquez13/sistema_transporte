export default class {
  getList = async () => {
    var url = "http://localhost:3001/api/transportista/lista";

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
