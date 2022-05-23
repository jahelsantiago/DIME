import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Slide, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import React from 'react'
import { readBiblioteca } from '../../firebase/fireActions';
import { BsTrash } from 'react-icons/bs';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function ResumenesList() {

    const [bibliotecaElements, setBibliotecaElements] = React.useState([]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        const getBiblioteca = async () => {
            const biblioteca = await readBiblioteca();
            console.log(biblioteca);
            setBibliotecaElements(biblioteca);
        };
        getBiblioteca();
    }, []);

    return (
        <Container>
            <Paper elevation={3}>
                <Typography variant="h4" align='center'>
                    Eliminar archivos de la biblioteca
                </Typography>
                <Stack direction={"column"} spacing={2} sx={{ p: 3 }}>
                    {bibliotecaElements.map((element, index) => <ResumenElement element={element} key={index} open = {handleClickOpen}/>)}
                </Stack>
            </Paper>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose}>Agree</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

function ResumenElement({ element, key, open }) {

    return (
        <Paper elevation={4} key={key}>
            <Stack direction={"row"} spacing={2} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant="body" >
                    {element.titulo}
                </Typography>
                <IconButton onClick={open}> 
                    <BsTrash />
                </IconButton>
            </Stack>
        </Paper>
    )
}



