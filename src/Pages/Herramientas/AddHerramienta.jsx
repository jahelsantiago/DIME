import { Button, Paper, Snackbar, Typography } from '@material-ui/core';
import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { addBiblioteca, getBibliotecaTypes, uploadBiblioteca } from '../../firebase/fireActions';
import useSections from '../Blog_new/BlogSections';

export default function AddHerramienta() {

    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        const succesfull = addBiblioteca(data.title, data.description, data.type, Sections, data.referencias)
        console.log(succesfull)
        setOpenSnack(true);
        reset();
    }

    const [SectionElement, Sections] = useSections({ url: "url", pdf: "pdf" });
    const [openSnack, setOpenSnack] = useState(false)
    const [types, setTypes] = useState()

    useEffect(() => {
        async function getTypes() {
            const types = await getBibliotecaTypes()
            setTypes(types)
        }
        
        getTypes()
    }, [])


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
                    {types && types.map(type => <option key={type.id} value={type.id}>{type.name}</option>)}
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
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                open={openSnack}
                onClose={() => setOpenSnack(false)}
                autoHideDuration={3000}
            >
                <Alert severity="success" style={{backgroundColor: "green", color: "white"}}>Libro subido con exito</Alert>
            </Snackbar>
        </Paper>
    )
}
