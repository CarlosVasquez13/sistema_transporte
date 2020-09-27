import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import LoginColaborador from "./Pages/LoginColaborador";
import LoginMenu from "./Pages/LoginMenu";
import LoginTransportista from "./Pages/LoginTransportista";
import MainColaborador from "./Pages/MainColaborador";

function App() {
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
