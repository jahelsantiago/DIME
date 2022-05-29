
import { Button } from "@material-ui/core";
import { Paper, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { readBiblioteca, uploadBiblioteca } from "../../firebase/fireActions";
import useSections from "../Blog_new/BlogSections";
import EditarHerramientas from "./EditarHerramientas";
import "./Herramientas.css";
import ResumenesList from "./ResumenesList";





export default function Herramientas() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    console.log(data);
    console.log(Sections)
    console.log(uploadBiblioteca(data.title, data.description, data.type, Sections))
  }

  const [SectionElement, Sections] = useSections({ url: "url", pdf: "pdf" });


  return (

    <div className="blog-container">
      <Typography variant="h2">
        Herramientas - Biblioteca
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h4">
          Subir nuevos archivos a la biblioteca
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="herramientas-container">
          <label htmlFor="title" className="label-herramienta">Titulo</label>
          <textarea {...register("title")} />
          <label htmlFor="description" className="label-herramienta">Descripcion</label>
          <textarea  {...register("description")} rows="4" cols="50"></textarea>
          <label htmlFor="type" className="label-herramienta">Tipo</label>
          <select {...register("type")}>
            <option value="spanish">Biblioteca en español</option>
            <option value="english">Biblioteca en Ingles</option>
            <option value="other">Herramientas y otros</option>
          </select>
          <label htmlFor="type" className="label-herramienta">Referencias</label>
          <textarea  {...register("description")} rows="2 " cols="50"></textarea>
          <label className="label-herramienta">
            Anexos y archivos
          </label>
          {SectionElement}

          <Button variant="contained" color="secondary" type="submit">
            Subir
          </Button>
        </form>
      </Paper>
      <ResumenesList />
      <EditarHerramientas />
    </div>
  );
}