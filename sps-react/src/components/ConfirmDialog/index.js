import React from 'react';
import PropTypes from 'prop-types';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Button } from '../../components/DefaultStyle';

export default function DialogConfirm({ title, content, onCancel, onConfirm }) {
  return (
    <Dialog open>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button type="button" background="#a1a1a1" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="button" onClick={onConfirm}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DialogConfirm.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
