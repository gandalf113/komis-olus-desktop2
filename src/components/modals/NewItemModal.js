import React, { useEffect, useState } from 'react'
import {
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Button
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { openNotification as showNotification } from '../../redux/notificationSlice';
import { toggleNewItemModal } from '../../redux/modalSlice';
import { getContractDetail } from '../../redux/databaseSlice';


export const NewItemModal = ({ isOpen, handleClose }) => {
    // Local state
    const [name, setName] = useState('')
    const [amount, setAmount] = useState(1)

    // Redux
    const { currentContract: contract } = useSelector(state => state.screen)

    // Reset the values on open
    useEffect(() => {
        setName('')
        setAmount(1)
    }, [isOpen])

    const dispatch = useDispatch()

    const createSale = async (name, amount) => {
        const contractId = contract.id_umowy
        window.api.createItem(name, amount, contractId)
            .then(_ => {
                // Close the modal
                dispatch(toggleNewItemModal(false))
                // Refresh the contract
                dispatch(getContractDetail(contractId))
                // Show success notification
                showNotification(`Pomyślnie dodano przedmiot do umowy ${contract.skrot}`)
            })
            .catch(error => {
                alert('Nie udało się dodać przedmiotu! Informacje o błędzie w konsoli.')
                console.error(error)
            })
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Przyjęcie towaru</DialogTitle>
                <DialogContent style={{ mt: 2, minWidth: 560 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <TextField
                            id="item-name-input"
                            label="Nazwa przedmiotu"
                            variant="filled"
                            onChange={(e) => setName(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="item-amount-input"
                            label="Ilość"
                            type="number"
                            defaultValue={1}
                            onChange={(e) => setAmount(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                        />
                    </Box>
                    <DialogActions>
                        <Button onClick={() => {
                            createSale(name, amount)
                        }}>Przyjmij</Button>
                    </DialogActions>

                </DialogContent>
            </Dialog>
        </div >
    );
}

export default NewItemModal