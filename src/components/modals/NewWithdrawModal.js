import {
    Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Box, Button
} from '@mui/material'
import { ClientContext } from '../../context/client-context';
import React, { useState, useContext, useEffect } from 'react'
import { getToday } from '../../utils/date-utils';
import { useDispatch, useSelector } from 'react-redux';
import { openNotification } from '../../redux/notificationSlice';
import { toCurrency } from '../../utils/misc-utils';
import { WithdrawContext } from '../../context/withdraw-context';

const NewWithdrawModal = ({ isOpen, handleClose }) => {
    const [amount, setAmount] = useState('');

    const dispatch = useDispatch();

    const { reloadWithdraws } = useContext(WithdrawContext);

    const { withdrawModal } = useSelector(state => state.modal);

    useEffect(() => {
        setAmount('');
    }, [isOpen]);

    // TODO: Get client id somehow
    const createWithdraw = () => {
        window.api.createWithdraw(withdrawModal.client.id_klienta, amount, getToday())
            .then(_ => {
                handleClose();
                reloadWithdraws();
                dispatch(openNotification(`Pomyślnie wypłacono ${toCurrency(amount)} dla ${withdrawModal.client.skrot}`));
            })
            .catch(err => {
                alert('Nie udało się wypłacić pieniędzy. Informacje o błędzie w konsoli.');
                console.error(err);
            })
    }

    const validateAmount = () => {
        return amount <= withdrawModal.withdrawableAmount;
    }

    const validateForm = () => {
        return amount && validateAmount() && amount > 0;
    }

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>Nowa wypłata</DialogTitle>
            <DialogContent style={{ mt: 2, minWidth: 560 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <TextField
                        id="client"
                        label="Klient"
                        type="text"
                        value={withdrawModal.client.skrot}
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
                        error={!validateAmount()}
                        helperText={!validateAmount() && 'Kwota nie może przekroczyć stanu konta klienta'}
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
                    <Button onClick={createWithdraw}
                        disabled={!validateForm()}
                    >Zapisz</Button>
                </DialogActions>

            </DialogContent>
        </Dialog>
    )
}

export default NewWithdrawModal