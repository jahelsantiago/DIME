
import { Button } from "@material-ui/core";
import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { getBiblioteca, readBiblioteca, uploadBiblioteca } from "../../firebase/fireActions";
import useSections from "../Blog_new/BlogSections";
import AddHerramienta from "./AddHerramienta";
import EditarHerramientas from "./EditarHerramientas";
import "./Herramientas.css";
import EliminarHerramientas from "./EliminarHerramientas";





export default function EditarHerramienta() {
  const [bibliotecaElements, setBibliotecaElements] = React.useState([]);
  React.useEffect(() => {
    const getBibliotecaElements = async () => {
      const biblioteca = await getBiblioteca();
      setBibliotecaElements(biblioteca);
      console.log(biblioteca);
    };
    getBibliotecaElements();
  }, []);

  return (

    <div className="blog-container">
      <Typography variant="h2">
        Herramientas - Biblioteca
      </Typography>
      <Stack spacing={2}>

        <AddHerramienta />
        <EliminarHerramientas bibliotecaElements={bibliotecaElements} setBibliotecaElements={setBibliotecaElements} />
        {/* <EditarHerramientas bibliotecaElements = {bibliotecaElements} setBibliotecaElements = {setBibliotecaElements}/> */}
      </Stack>
    </div>
  );
}