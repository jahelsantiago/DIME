import { Button, IconButton, TextField } from '@material-ui/core'
import React from 'react'
import { kinds } from './BlogGeneratorUtils'
import "./PaginaCompleta.css"


export default function PaginaCompleta({sections , push, remove, edit, up, down}) {                
    return (
        <div className = "completa-container">
            <div className = "">
                {sections.map((item,index)=>(
                    <ItemSeccion key = {item+index} item={item} index={index} deleteItem={()=>{remove(index)}} edit={edit} up={()=>{up(index)}} down = {()=>down(index)}/>
                ))}
            </div>            
            <div className = "completa-buttons">                
                {Object.keys(kinds).map((item, idx)=>(
                    <Button onClick = {()=>push({kind : kinds[item], payload : ""})} variant="contained" color="primary" key = {item+idx}>{kinds[item]}</Button>
                ))}                
            </div>

        </div>
    )
}


/**
 * Retorna un componente correspondiente a una seccion
 * @param {*} param0 
 * @returns 
 */
function ItemSeccion({item, index, deleteItem, edit, up, down}){
    return(
        <div className = "completa-item">            
            <IconButton onClick = {deleteItem}>
                x 
            </IconButton>
            <IconButton onClick = {up}>
                🡩
            </IconButton>
            <IconButton onClick = {down}>
                🡫
            </IconButton>
            {getField(item, index, edit)}                                    
        </div>
    )
}


/**
 * Retorn un Field Texto o Input FIle segun el tipo de input.kind lo requiera
 * @param {*} item 
 * @param {*} index 
 * @param {*} edit 
 * @returns 
 */
function getField(item, index, edit){
    if(item.kind === kinds.titulo || item.kind === kinds.parrafo || item.kind === kinds.embed){
        return <TextField 
                    className = "inputs"  
                    label = {item.kind} 
                    value = {item.payload} 
                    variant = {"outlined"}
                    onChange = {(e)=>{edit(index, {...item, payload : e.target.value})}} 
                    style = {{width : "90%"}}
                    multiline = {true}
                    rows = {item.kind === kinds.titulo?1:6}
                />
    }

    
    if(item.kind === kinds.imagen){
        return <input type="file" accept="image/png, image/jpeg" onChange = {(e)=>{item.payload = e.target.files[0]}}/>
    }

    if(item.kind === kinds.inicio){
        return(
            <div className = "incio-seccion">
                <h2>
                    Inicio de Seccion
                </h2>
                <input type="color" id="back" name="back"value={item.payload.back} onChange = {(e)=>edit(index, {...item, payload : {...item.payload, back : e.target.value}})}/>
                <label for="back">
                    Color Background 
                </label>
                <input type="color" id="letra" name="letra"value={item.payload.letra} onChange = {(e)=>edit(index, {...item, payload : {...item.payload, letra : e.target.value}})}/>
                <label for="letra">
                    Color Letra 
                </label>
            </div>
            
        )
    }

    if(item.kind === kinds.fin){
        return(
            <h2>
                Fin de seccion
            </h2>
        )
    }
}