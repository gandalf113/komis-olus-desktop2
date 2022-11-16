import React from 'react'
import {
    Dialog, DialogTitle, DialogContent, DialogActions, Box, Button
} from '@mui/material';


export const ConfirmModal = ({ isOpen, handleClose, title, handleYes }) => {

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent style={{ mt: 2, minWidth: 560 }}>

                    <DialogActions>
                        <Button color='inherit' onClick={handleClose}>Nie</Button>
                        <Button onClick={handleYes}>Tak</Button>
                    </DialogActions>

                </DialogContent>
            </Dialog>
        </div >
    );
}

export default ConfirmModal