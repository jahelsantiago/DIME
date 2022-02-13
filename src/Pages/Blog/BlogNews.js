import "./BlogNews.css"
import React, { useState } from 'react'
import { generateCodigoPaginaCompleta, generateCodigoResumen, kinds } from './BlogGeneratorUtils';
import { getFileUrl, uploadFile } from "../../firebase/storageActions";
import { Button } from "@material-ui/core";
import TextFieldGenerator from "../../components/TextFieldGenerator";
import InputFileGenerator from "../../components/InputFileGenerator";
import PaginaCompleta from "./PaginaCompleta";
import useArray from "../../Hooks/useArray";
import { CopyButton } from "../../components/CopyButton";

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

    const [sections , push, remove, edit, up, down] = useArray() //array to sabe de sections
        
    
    const processSections =  async (sections = []) => {
        const newSections = [...sections]
        for(let i = 0; i < sections.length; i++){
            let section = sections[i]
            if(section.kind === kinds.imagen){
                const url = await getFileUrl(section.payload)
                newSections[i] = {...section, payload : url}
            } 
        }       
        return newSections
    }
    
    const processInputs = async (inputs, sections) => {
        const imagen = await uploadFile(inputs.imagen)
        const gif = await uploadFile(inputs.gif)
        const pdf = await uploadFile(inputs.pdf) 
        const newSections = await processSections(sections)
        return {...inputs, ...{imagen, gif, pdf}, sections : newSections}
    }
    
    const generarResumen = async () => {                                              
        const newInputs = await processInputs(inputs, sections)        
        setReportePaginaCompleta(generateCodigoPaginaCompleta(newInputs))    
        setReporteSeccionResumen(generateCodigoResumen(newInputs))
    }
                
    return (
        <div className ="container">                        

            <h1>Resumen</h1>            
            <h2>Datos para llenar</h2>            
            <div className = "inputs-continer" >
                <TextFieldGenerator textInputs = {textInputs} inputs = {inputs} setInputs = {setInputs}/>
                <InputFileGenerator filesInputs = {filesInputs} inputs = {inputs}/>                
                <PaginaCompleta sections = {sections} push = {push} remove = {remove} edit = {edit} up = {up} down = {down}/>
                
                <br/>
                <Button onClick = {generarResumen} variant="contained" color="primary">Generar Codigos</Button>
                <br/>
            </div>
            <h2>
                Codigo para Pagina Completa
            </h2>     
            <CopyButton text = {ReportePaginaCompleta}/>
            <p className = "codigo-item">{ReportePaginaCompleta}</p>            
            <br/>            
            <h2>
                Codigo para Seccion del Resumen
            </h2>
            <CopyButton text = {ReporteSeccionResumen}/>
            <p>{ReporteSeccionResumen}</p>
        </div>
    )
}
