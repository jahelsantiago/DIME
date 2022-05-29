import { Stack } from '@mui/material'
import React from 'react'
import ListElement from './ListElement'

/**
 * 
 * @param {array} list de objetos que contienen los datos a mostrar
 * @param {string} titleAtributte  nombre del atributo del objeto que se desea mostrar en el titulo de la lista
 * @param {componente} Icon que se desea que aparezca en el icono
 * @param {functin}  handleClickOpen que se ejecuta al hacer click en el Icono y ejecuta esa funcion con el indice de ese elemento 
 * @returns 
 */
export default function List({list, handleClickOpen, Icon, titleAtributte}) {
    return (
        <Stack direction={"column"} spacing={2} sx={{ p: 3 }}>
            {list.map((element, index) => <ListElement titulo={element[titleAtributte]} key={index} onClick={()=>handleClickOpen(index)} Icon={Icon} />)}
        </Stack>
    )
}
