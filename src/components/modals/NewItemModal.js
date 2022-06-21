import React, { useState } from 'react'
import {
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Button
} from '@mui/material';
import { useDispatch } from 'react-redux';

export const NewItemModal = ({ isOpen, handleClose }) => {
    // Local state

    // Redux

    const dispatch = useDispatch()


    const createSale = async (item) => {
        console.log("NEW ITEM:")
        console.log(item)
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Przyjęcie towaru</DialogTitle>
                <DialogContent style={{ mt: 2, minWidth: 560 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <TextField
                            id="outlined-helperText"
                            label="Nazwa przedmiotu"
                            variant="filled"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="filled-number"
                            label="Ilość"
                            type="number"
                            defaultValue={1}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                        />
                    </Box>
                    <DialogActions>
                        <Button>Przyjmij</Button>
                    </DialogActions>

                </DialogContent>
            </Dialog>
        </div >
    );
}

export default NewItemModal