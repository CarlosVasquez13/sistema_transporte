import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import NewRecorrido from "./Components/NewRecorrido";
import AddColaborador from "./Pages/AddColaborador";
import LoginColaborador from "./Pages/LoginColaborador";
import LoginMenu from "./Pages/LoginMenu";
import LoginTransportista from "./Pages/LoginTransportista";
import MainColaborador from "./Pages/MainColaborador";
import MainReport from "./Pages/MainReport";
import MainTransportista from "./Pages/MainTransportista";
import Sucursales from "./Pages/Sucursales";

function App() {
  const remove = () => {
    window.sessionStorage.removeItem("usuario");
    window.sessionStorage.removeItem("id");
  };
  const LogOut = () => {
    return (
      <React.Fragment>
        {remove}
        <Redirect to="/" />
      </React.Fragment>
    );
  };
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={LoginMenu} />
          <Route path="/login" exact component={LoginMenu} />
          <Route path="/login/colaborador" exact component={LoginColaborador} />
          <Route
            path="/login/transportista"
            exact
            component={LoginTransportista}
          />
          <Route path="/main/colaborador" exact component={MainColaborador} />
          <Route
            path="/main/transportista"
            exact
            component={MainTransportista}
          />

          <Route path="/sucursal" exact component={Sucursales} />
          <Route
            path="/sucursal/:idSucursal/add"
            exact
            component={AddColaborador}
          />
          <Route
            path="/transportista/nuevo-recorrido/:idSucursal/:nombre"
            exact
            component={NewRecorrido}
          />
          <Route path="/mainReport" exact component={MainReport} />
          <Route path="/logout" exact component={LogOut} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
