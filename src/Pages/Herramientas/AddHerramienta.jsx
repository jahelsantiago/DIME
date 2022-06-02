import { Button, Paper, Typography } from '@material-ui/core';
import React from 'react'
import { useForm } from 'react-hook-form';
import { addBiblioteca, uploadBiblioteca } from '../../firebase/fireActions';
import useSections from '../Blog_new/BlogSections';

export default function AddHerramienta() {

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        console.log(data)
        console.log(addBiblioteca(data.title, data.description, data.type, Sections, data.referencias))
    }
    const [SectionElement, Sections] = useSections({ url: "url", pdf: "pdf" });


    return (
        <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h4">
                Subir nuevos archivos a la biblioteca
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="herramientas-container">
                <label htmlFor="title" className="label-herramienta">Titulo</label>
                <textarea {...register("title")} />
                <label htmlFor="description" className="label-herramienta">Descripcion</label>
                <textarea  {...register("description")} rows="10" cols="50"></textarea>
                <label htmlFor="type" className="label-herramienta">Tipo</label>
                <select {...register("type")}>
                    <option value="spanish">Biblioteca en español</option>
                    <option value="english">Biblioteca en Ingles</option>
                    <option value="other">Herramientas y otros</option>
                </select>
                <label htmlFor="type" className="label-herramienta">Referencias</label>
                <textarea  {...register("referencias")} rows="5 " cols="50"></textarea>
                <label className="label-herramienta">
                    Anexos y archivos
                </label>
                {SectionElement}

                <Button variant="contained" color="secondary" type="submit">
                    Subir
                </Button>
            </form>
        </Paper>
    )
}
