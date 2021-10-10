import React from 'react'

export default function InputFileGenerator({filesInputs = [], inputs = {}}) {
    return (
        <div style = {{display: "flex", flexDirection : "column"}}>
            {filesInputs.map(key => (
                <div key = {key}>
                    <p>{key}</p>
                    <input type="file" id = {key} accept="image/png, image/jpeg" ref = {inputs[key]}/>    
                </div>
            ))}  
        </div>
    )
}
