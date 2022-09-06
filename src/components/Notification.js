import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { useDispatch, useSelector } from 'react-redux';
import { closeNotification } from '../redux/notificationSlice';

import "../global.css";

const Notification = () => {
    const { isOpen, message } = useSelector(state => state.notification)

    const dispatch = useDispatch()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(closeNotification())
    };

    const action = (
        <React.Fragment>
            {/* <Button color="secondary" size="small" onClick={handleClose}>
                COFNIJ
            </Button> */}
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );


    return (
        <Snackbar
            open={isOpen}
            autoHideDuration={3000}
            onClose={handleClose}
            message={message}
            action={action}
            className='no-print'
        />
    )
}

export default Notification