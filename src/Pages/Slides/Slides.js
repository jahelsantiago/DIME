import React, { useState } from 'react'
import TextFieldGenerator from "../../components/TextFieldGenerator";
import InputFileGenerator from "../../components/InputFileGenerator";
import { Button } from '@material-ui/core';
import { getCodigoSlides } from './slidesUtils';
import { uploadFile } from '../../firebase/storageActions';
import { Container, Paper, Typography } from '@mui/material';

const textInputs = ["titulo" ,"descripcion", "boton", "destinoBoton"]
const filesInputs = ["imagen"]



export default function Slides() {
    const [inputs, setinputs] = useState({
        titulo : "",
        descripcion : "",
        imagen : React.createRef(),                
        boton : "",
        destinoBoton : "",
    })

    const [codigoGenerado, setCodigoGenerado] = useState("")

    const generarCodigo = async () => {
        const imagen = await uploadFile(inputs.imagen, "/Blog/Slides")      
        setCodigoGenerado(getCodigoSlides({...inputs, imagen}))
        
    }

    return (
        <Container>
            <Typography variant='h1'>
                Slides
            </Typography>
            <Paper elevation={3} sx = {{p:1, mb: 3}}>
                <Typography variant='h3'>
                    ¿Como añadir una slide nueva?
                </Typography>

            </Paper>
            <Paper elevation={3} sx = {{p:1}}>
                <Typography variant='h3'>
                    Generar codigo para slides
                </Typography>
                <TextFieldGenerator textInputs = {textInputs} inputs = {inputs} setInputs = {setinputs}/>
                <InputFileGenerator filesInputs = {filesInputs} inputs = {inputs}/>
                <Button onClick = {generarCodigo} variant="contained" color="primary" style = {{width : "100%"}}>Generar Codigos</Button>            
                <p>
                    {codigoGenerado}
                </p>
            </Paper>
         </Container>
    )
}
