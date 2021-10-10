import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { CopyButton } from '../components/CopyButton'
import RadioButtonsGroup from '../components/RadioButton'
import "./Ets.css"
import generarCodigo from './EtsUtils'


const conclusionButton = {name : "CONCLUSIÓN", options : ["No Cubrir", "Cubrir con generación de evidencia", "Cubrir con negociación de precios", "Restringir la cobertura", "Cubrir"]}

const radioButtons = [    
    {name : "PROBLEMA", options : ["DESCONOCIDO", "VARÍA", "PROBABLEMENTE", "NO", "SI"]},
    {name : "EFECTOS DESEABLES", options : ["DESCONOCIDO", "VARÍA", "TRIVIALES", "PEQUEÑOS","MODERADOS", "GRANDES"]},
    {name : "EFECTOS INDESEABLES", options : ["DESCONOCIDO", "VARÍA", "TRIVIALES", "PEQUEÑOS","MODERADOS", "GRANDES"]},
    {name : "CONFIABILIDAD DE LA EVIDENCIA", options : ["NO SE INCLUYERON ESTUDIOS", "MUY BAJA", "BAJA", "MODERADA", "ALTA"]},
    {name : "CONFIABILIDAD DE LA EVIDENCIA", options : ["DESCONOCIDO", "VARÍAN", "NO FAVORECE A LA INTERVENCIÓN NI AL COMPRADOR", "PROBABLEMENTE FAVORECE A LA INTERVENCIÓN", "FAVORECE A LA INTERVENCIÓN", "PROBABLEMENTE FAVORECE A LA COMPARACIÓN", "FAVORECE A LA COMPARACIÓN"]},
]
    

export const Ets = () => {

    const [values, setValues] = useState({
        conclusion : "",
        medicamento : "",
        resumen : React.createRef(),
        informe : React.createRef(),
        textoResumen : "",                
    })

    const [codigo, setCodigo] = useState("")

    async function renderCode(){
        setCodigo(await generarCodigo(values, radioButtons, conclusionButton))
    }


    console.log(values)


    return (
        <div className = "Ets-container">            
            
            <TextField
                id="outlined-multiline-flexible"
                label="Nombre del medicamento"                
                value={values.medicamento}
                onChange={(e)=>setValues(prev => ({...prev, medicamento : e.target.value}))}            
                style = {{width : "100%"}}                
            />

            <div className="buttons-container">
                <RadioButtonsGroup componentName = {conclusionButton.name} options = {conclusionButton.options} values = {values} setValues = {setValues} />        
            </div>

            <TextField
                id="outlined-multiline-flexible"
                label="Conclusion"
                multiline
                maxRows={15}
                value={values.conclusion}
                onChange={(e)=>setValues(prev => ({...prev, conclusion : e.target.value}))}            
                style = {{width : "100%"}}                
            />
            
            <h3>RESUMEN PARA TOMADORES DE DECISIONES (FORMATO DECIDE)</h3>
            <input type="file" ref = {values.resumen}/>    
            <h3>INFORME FINAL</h3>
            <input type="file" ref = {values.informe}/>    

            <div className="buttons-container">
                {radioButtons.map(button => 
                    <RadioButtonsGroup componentName = {button.name} options = {button.options} values = {values} setValues = {setValues}/>        
                )}                
            </div>

            <Button variant="contained" color="primary" onClick = {renderCode}>
                Generar Codigo
            </Button>
            <CopyButton text = {codigo}/>

            <p>
                {codigo}
            </p>
        </div>
    )
}
