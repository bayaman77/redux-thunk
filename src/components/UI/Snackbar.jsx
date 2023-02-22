import { Alert, Snackbar as MuiSnackbar } from '@mui/material';
import React from 'react';

const Snackbar = ({isOpen, onClose, message, severity, autoHideDuration }) => {
    return (
        <MuiSnackbar
        open={isOpen}
        autoHideDuration={autoHideDuration || 4000}
        onClose={onClose}
        message="Note archived"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </MuiSnackbar>
    );
};

export default Snackbar;