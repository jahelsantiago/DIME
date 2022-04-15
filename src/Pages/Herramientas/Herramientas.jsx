import React from "react";
import { useForm } from "react-hook-form";
import { uploadBiblioteca } from "../../firebase/fireActions";
import useSections from "../Blog_new/BlogSections";
import "./Herramientas.css";





export default function Herramientas() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    console.log(data);
    console.log(Sections)
    console.log(uploadBiblioteca(data.title, data.description, data.type , Sections))
  }

  const [SectionElement, Sections] = useSections({url: "url", pdf:"pdf"});
   
  return (

    <div className="blog-container">
    <h1>
      Herramientas - Biblioteca
    </h1>
    <p>Aca puede subir nuevos archivos a la biblioteca</p>

    <form onSubmit={handleSubmit(onSubmit)} className = "herramientas-container">
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

      <input type="submit" />
    </form>
  </div>
  );
}