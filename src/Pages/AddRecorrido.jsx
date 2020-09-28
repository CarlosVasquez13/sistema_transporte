import React from "react";
import { useForm } from "react-hook-form";

const AddRecorrido = () => {
  const { register, handleSubmit, errors } = useForm();

  return (
    <div>
      <h1>Ingresar Nuevo recorrido</h1>
    </div>
  );
};

export default AddRecorrido;
