import {
    Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Box, Button
} from '@mui/material'
import { ClientContext } from '../../context/client-context';
import React, { useState, useContext, useEffect } from 'react'
import { getToday } from '../../utils/date-utils';
import { useDispatch } from 'react-redux';
import { openNotification } from '../../redux/notificationSlice';
import { toCurrency } from '../../utils/miscUtils';
import { WithdrawContext } from '../../context/withdraw-context';

const NewWithdrawModal = ({ isOpen, handleClose }) => {
    const [amount, setAmount] = useState('');

    const dispatch = useDispatch();

    const { currentlyEditetClient } = useContext(ClientContext);
    const { reloadWithdraws } = useContext(WithdrawContext);

    useEffect(() => {
        setAmount('');
    }, [isOpen]);

    // TODO: Get client id somehow
    const createWithdraw = () => {
        window.api.createWithdraw(currentlyEditetClient.id_klienta, amount, getToday())
            .then(_ => {
                handleClose();
                reloadWithdraws();
                dispatch(openNotification(`Pomyślnie wypłacono ${toCurrency(amount)} dla ${currentlyEditetClient.skrot}`))
            })
            .catch(err => {
                alert('Nie udało się wypłacić pieniędzy. Informacje o błędzie w konsoli.')
                console.error(err);
            })
    }

    if (!currentlyEditetClient) return null;

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Nowa wypłata</DialogTitle>
            <DialogContent style={{ mt: 2, minWidth: 560 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

                    <TextField
                        id="client"
                        label="Klient"
                        type="text"
                        value={currentlyEditetClient.skrot}
                        variant="filled"
                    />

                    <TextField
                        id="data"
                        label="Data"
                        type="text"
                        value={getToday()}
                        variant="filled"
                    />

                    <TextField
                        id="amount"
                        label="Kwota [zł]"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="filled"
                    />

                </Box>
                <DialogActions>
                    <Button onClick={() => {
                        handleClose()
                    }}>Odrzuć</Button>
                    <Button onClick={createWithdraw}>Zapisz</Button>
                </DialogActions>

            </DialogContent>
        </Dialog>
    )
}

export default NewWithdrawModal