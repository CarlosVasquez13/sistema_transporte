import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import LoginController from "../Controllers/Login";

const LoginTransportista = () => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const Login = new LoginController();
    const result = await Login.Colaborador(data);
    if (result.Success) {
      history.push("/main/colaborador");
    }
    console.log(result);
  };
  return (
    <div>
      <h1>Login Transportista</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container alignContent="center" direction="column">
          <Grid item lg={6}>
            <TextField
              id="standard-basic"
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
          </Grid>
          <Grid item lg={6}>
            <TextField
              id="standard-basic"
              type="password"
              label="Contraseña"
              className="my-3"
              defaultValue="password123"
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
          </Grid>
          <Grid item ld={6}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="btn-block mt-4"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default LoginTransportista;
