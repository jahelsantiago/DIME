import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react'

export default function HerramientasLista({ }) {

    const [bibliotecaElements, setBibliotecaElements] = React.useState([]);

    React.useEffect(() => {
        const getBiblioteca = async () => {
            const biblioteca = await readBiblioteca();
            setBibliotecaElements(biblioteca);
        };
        getBiblioteca();
    }, []);


    return (
        <>
            <Stack direction={"column"} spacing={2} sx={{ p: 3 }}>
                {bibliotecaElements.map((element, index) => <ResumenElement element={element} key={index} open={() => handleClickOpen(index)} />)}
            </Stack>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"¿Está seguro que desea eliminar el siguiente elemento de la biblioteca?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {selectedElement.titulo}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleDelete}>Eliminar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
