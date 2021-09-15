import "./BlogNews.css"
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { generateCodigoPaginaCompleta, generateCodigoResumen } from './BlogGeneratorUtils';
import { uploadFile } from "../firebase/storageActions";
import { Button } from "@material-ui/core";
import TextFieldGenerator from "../components/TextFieldGenerator";
import InputFileGenerator from "../components/InputFileGenerator";
import PaginaCompleta from "./PaginaCompleta";

/**The fields of the files inputs */
const filesInputs = ["imagen", "gif", "pdf"]

/**The fields of the text input */
const textInputs = ["titulo", "fecha", "autores", "resumen", "afiliacion", "categoria", "Numero de pagina"]

export const BlogNews = () => {
    const [inputs, setInputs] = useState({
        titulo : "",
        fecha : "",
        autores : "",
        resumen : "",
        afiliacion : "",
        categoria : "",
        pagina : "",            
        imagen : React.createRef(),
        gif : React.createRef(),
        pdf : React.createRef(),               
    })    

    const [ReportePaginaCompleta, setReportePaginaCompleta] = useState("")
    const [ReporteSeccionResumen, setReporteSeccionResumen] = useState("")
    
    const generarResumen = async () => {                
        const imagen = await uploadFile(inputs.imagen)
        const gif = await uploadFile(inputs.gif)
        const pdf = await uploadFile(inputs.pdf)                
        setReportePaginaCompleta(generateCodigoPaginaCompleta({...inputs, ...{imagen, gif, pdf}}))        
        setReporteSeccionResumen(generateCodigoResumen({...inputs, ...{imagen, gif, pdf}}))
    }
                
    return (
        <div className ="container">            
            <h1>Resumen</h1>            
            <h2>Datos para llenar</h2>            
            <div className = "inputs-continer" >
                <TextFieldGenerator textInputs = {textInputs} inputs = {inputs} setInputs = {setInputs}/>
                <InputFileGenerator filesInputs = {filesInputs} inputs = {inputs}/>                
                <PaginaCompleta/>
                
                <br/>
                <Button onClick = {generarResumen} variant="contained" color="primary">Generar Codigos</Button>
                <br/>
            </div>
            <h2>
                Codigo para Pagina Completa
            </h2>
            <p>{ReportePaginaCompleta}</p>            
            <br/>            
            <h2>
                Codigo para Seccion del Resumen
            </h2>
            <p>{ReporteSeccionResumen}</p>
        </div>
    )
}
