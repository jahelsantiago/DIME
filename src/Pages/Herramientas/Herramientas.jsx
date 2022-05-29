
import { Button } from "@material-ui/core";
import { Paper, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { readBiblioteca, uploadBiblioteca } from "../../firebase/fireActions";
import useSections from "../Blog_new/BlogSections";
import AddHerramienta from "./AddHerramienta";
import EditarHerramientas from "./EditarHerramientas";
import "./Herramientas.css";
import EliminarHerramientas from "./EliminarHerramientas";





export default function EditarHerramienta() {
  const [bibliotecaElements, setBibliotecaElements] = React.useState([]);
  React.useEffect(() => {
    const getBiblioteca = async () => {
        const biblioteca = await readBiblioteca();
        setBibliotecaElements(biblioteca);
    };
    getBiblioteca();
}, []);

  return (

    <div className="blog-container">
      <Typography variant="h2">
        Herramientas - Biblioteca
      </Typography>
      <AddHerramienta />
      <EliminarHerramientas bibliotecaElements = {bibliotecaElements} setBibliotecaElements = {setBibliotecaElements}/>
      <EditarHerramientas bibliotecaElements = {bibliotecaElements} setBibliotecaElements = {setBibliotecaElements}/>
    </div>
  );
}