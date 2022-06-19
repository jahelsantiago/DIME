import { Button, Paper, TextField, Typography } from '@material-ui/core'
import { Stack } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';
import FileSelector from '../../components/FileSelector';
import UseLoadingScreen from '../../components/UseLoadingScreen';
import { addPrecio } from '../../firebase/fireStoreActions/precios';
import { uploadFile } from '../../firebase/storageActions';
import useSections from '../Blog_new/BlogSections';

export default function Precios() {

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async data => {
        toggleLoading(true);
        //upoload the image
        const image_url = await uploadFile(selectedFileImage, "/Precios/Images")
        //upload the pdf
        const file_url = await uploadFile(selectedFile, "/Precios/Images")


        await addPrecio(data.title, data.description, image_url, file_url) //finish here
        reset();
        toggleLoading(false);
    }

    const [FileImage, selectedFileImage, isFileImagePicked] = FileSelector()
    const [File, selectedFile, isFilePicked] = FileSelector()

    const [ScreenCompoenent, toggleLoading] = UseLoadingScreen()

    return (
        <>
            {ScreenCompoenent}
            <div>
                <Typography variant='h2' align='center'>
                    Precios
                </Typography>
                <Paper elevation={2}>
                    <form onSubmit={handleSubmit(onSubmit)} className="herramientas-container">
                        <label htmlFor="title" className="label-herramienta">Titulo</label>
                        <textarea {...register("title")} />
                        <label htmlFor="description" className="label-herramienta">Descripción</label>
                        <textarea {...register("description")} />
                        <label className='label-herramienta'>Imagen</label>
                        {FileImage}
                        <label className="label-herramienta">
                            Anexos y archivos
                        </label>
                        {File}
                        <Button variant="contained" color="secondary" type="submit">
                            Subir
                        </Button>
                    </form>
                </Paper>
            </div>
        </>
    )
}
