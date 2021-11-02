import * as React from 'react';
import ReactDOM from "react-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CancelButton, PrimaryButton } from './Buttons';

const modalContainer = document.querySelector("#modalContainer");

export default function ConfirmationDialog({ title, message, isOpened, onConfirm, onClose }) {
  return (
    ReactDOM.createPortal(
      <div>
        <Dialog
          open={isOpened}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <CancelButton variant="contained" onClick={onClose}>Cancelar</CancelButton>
            <PrimaryButton variant="contained" onClick={onConfirm} autoFocus>Aceptar</PrimaryButton>
          </DialogActions>
        </Dialog>
      </div>, 
      modalContainer
    )
  );
}