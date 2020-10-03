import React, { useState } from "react";
import { Button, Grid, Paper, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import LoginController from "../Controllers/Login";

const LoginColaborador = () => {
  const [Auth, setAuth] = useState({ value: false, message: "" });
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const Login = new LoginController();
    const result = await Login.Colaborador(data);
    if (result.Success) {
      history.replace("/main/colaborador");
    } else {
      setAuth({
        value: true,
        message: result.Response,
      });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
        <Grid container alignItems="center">
          <Grid item lg={4} className="mx-auto">
            <Paper>
              <h3>Colaborador</h3>
              <TextField
                id="standard-basic"
                style={{ width: "80%" }}
                label="Usuario"
                name="user"
                inputRef={register({
                  required: {
                    value: true,
                    message: "Ingresa tu nombre de usuario.",
                  },
                })}
              />
              <div>
                <span className="text-danger text-small mb-0">
                  {errors?.user?.message}
                </span>
              </div>
              <TextField
                id="standard-basic"
                style={{ width: "80%" }}
                type="password"
                label="Contraseña"
                className="my-3"
                name="password"
                autoComplete="off"
                inputRef={register({
                  required: {
                    value: true,
                    message: "Ingresa tu contraseña.",
                  },
                })}
              />
              <div>
                <span className="text-danger text-small mb-0">
                  {errors?.password?.message}
                </span>
              </div>
              {Auth.value && (
                <div
                  className="alert alert-danger mx-auto"
                  style={{ width: "80%" }}
                  role="alert"
                >
                  {Auth.message}
                </div>
              )}
              <Button
                type="submit"
                className="my-3"
                variant="contained"
                color="primary"
                style={{ width: "80%" }}
              >
                Login
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default LoginColaborador;
