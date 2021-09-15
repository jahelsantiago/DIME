import { Button, IconButton, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import useArray from '../components/useArray'
import "./PaginaCompleta.css"

const kinds = {titulo : "titulo", parrafo : "parrafo", imagen : "imagen" }




export default function PaginaCompleta() {
    
    const [sections , push, remove, edit] = useArray()
    
    console.log(sections)
    return (
        <div className = "completa-container">
            <div className = "">
                {sections.map((item,index)=>(
                    <ItemSeccion item = {item} index = {index} deleteItem = {()=>{remove(index)}} edit = {edit}/>
                ))}
            </div>            
            <div className = "completa-buttons">                
                {Object.keys(kinds).map((item, idx)=>(
                    <Button onClick = {()=>push({kind : item, payload : ""})} variant="contained" color="primary" key = {idx}>{item}</Button>
                ))}                
            </div>

        </div>
    )
}


function ItemSeccion({item, index, deleteItem, edit}){
    return(
        <div className = "completa-item">            
            <IconButton onClick = {deleteItem}>
                x 
            </IconButton>
            {getField(item, index, edit)}                                    
        </div>
    )
}


function getField(item, index, edit){
    if(item.kind === kinds.titulo || item.kind === kinds.parrafo){
        return <TextField 
                    className = "inputs"  
                    label = {item.kind} 
                    value = {item.payload} 
                    onChange = {(e)=>{edit(index, {...item, payload : e.target.value})}} 
                    style = {{width : "90%"}}
                    multiline = {true}
                    rows = {item.kind === kinds.titulo?1:6}
                />
    }
    
    if(item.kind === kinds.imagen){
        return <input type="file" accept="image/png, image/jpeg" onChange = {(e)=>{item.payload = e.target.files[0]}}/>
    }
}