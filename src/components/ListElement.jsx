import { IconButton, Paper, Typography } from '@material-ui/core'
import { Stack } from '@mui/material'
import React from 'react'

/**
 * 
 * @param {titulo} string lo que se desea que aparezca en el titulo de la lista
 * @param {onClick} function funcion que se ejecuta al hacer click en el Icono
 * @param {Icon} componente que se desea que aparezca en el icono 
 * @returns 
 */
export default function ListElement({ titulo, key, onClick, Icon }) {

    return (
        <Paper elevation={4} key={key}>
            <Stack direction={"row"} spacing={2} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="body" >
                    {titulo}
                </Typography>
                <IconButton onClick={onClick}> 
                    <Icon/>
                </IconButton>
            </Stack>
        </Paper>
    )
}