import { TextField } from '@material-ui/core'
import React from 'react'



/**
 * Function to generate text Inputs based un a list of textInputs
 * @param {textInputs} Array text to generate the inputs that is also the key in the inputs continer
 * @returns 
 */
export default function TextFieldGenerator({textInputs = [], inputs = {}, setInputs}) {
    
    /**Funtion to change when something is typed in the textFields */
    const handleInputChange = (e, key) => {
        const inputsCopy = {...inputs}
        inputsCopy[key] = e.target.value
        setInputs(inputsCopy)
    }
        
    return (
        <div style = {{display: "flex", flexDirection : "column"}}>
        {textInputs.map(key => (
                    <TextField key = {key} className = "inputs" id = {key} label = {key} value = {inputs[key]} onChange = {(e) => handleInputChange(e, key)}/>    
                ))}
        </div>      
    )
}


