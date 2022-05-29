import React from 'react'
import List from '../../components/List'
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Slide, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import Modal from '../../components/Modal';
import {MdModeEdit} from 'react-icons/md';


export default function EditarHerramientas({bibliotecaElements, setBibliotecaElements}) {
  const [open, setOpen] = React.useState(false);
  const [selectedElement, setSelectedElement] = React.useState({ titulo: "" });

  const handleClickOpen = (index) => {
      setSelectedElement(bibliotecaElements[index]);
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleDelete = () => {
      setBibliotecaElements(bibliotecaElements.filter(element => element.titulo !== selectedElement.titulo));
      handleClose();
  }



  return (
      <Container>
          <Paper elevation={3}>
              <Typography variant="h4" align='center'>
                  Editar archivos de la biblioteca
              </Typography>
      
              <List Icon={MdModeEdit} list={bibliotecaElements} handleClickOpen={handleClickOpen} titleAtributte={"titulo"} />
          </Paper>


          <Modal open={open} handleClose={handleClose} title={"¿Esta seguro que desea eliminar?"} >
              <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                      {selectedElement.titulo}
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClose}>Cancelar</Button>
                  <Button onClick={handleDelete}>Eliminar</Button>
              </DialogActions>
          </Modal>
      </Container>
  )
}


