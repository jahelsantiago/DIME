import React, { useState } from 'react'
import TextFieldGenerator from "../components/TextFieldGenerator";
import InputFileGenerator from "../components/InputFileGenerator";
import { Button } from '@material-ui/core';
import { getCodigoSlides } from './slidesUtils';
import { uploadFile } from '../firebase/storageActions';

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
        const imagen = await uploadFile(inputs.imagen)        
        setCodigoGenerado(getCodigoSlides({...inputs, imagen}))
        
    }

    return (
        <div className = "container">
            <h1>
                Slides
            </h1>
            <TextFieldGenerator textInputs = {textInputs} inputs = {inputs} setInputs = {setinputs}/>
            <InputFileGenerator filesInputs = {filesInputs} inputs = {inputs}/>
            <br/>
            <Button onClick = {generarCodigo} variant="contained" color="primary" style = {{width : "100%"}}>Generar Codigos</Button>            
            <br/>            
            <p>
                {codigoGenerado}
            </p>
        </div>
    )
}
