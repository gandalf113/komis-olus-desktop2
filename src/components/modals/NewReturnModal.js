import React, { useContext, useState } from 'react'
import {
    Dialog, DialogTitle, DialogContent, TextField, Box, DialogActions, Button
} from '@mui/material';
import { useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import ItemDetailModal from './ItemDetailModal';
import { openNotification, openNotification as showNotification } from '../../redux/notificationSlice';
import { useDispatch } from 'react-redux';
import { getSalesData, getItemsDetailed } from '../../redux/databaseSlice';
import { SalesContext } from '../../context/sales-context';
import { getToday } from '../../utils/date-utils';
import { ContractContext } from '../../context/contract-context';
import { checkIfAmountRemaining, checkIfSoldOut } from '../../utils/miscUtils';

export const NewReturnModal = ({ isOpen, handleClose }) => {
    const { currentlyEditedItem, reloadContracts } = useContext(ContractContext);

    const [amount, setAmount] = useState(1);

    const dispatch = useDispatch();

    const createReturn = async () => {
        const date = getToday();

        window.api.createReturn(currentlyEditedItem.id_przedmiotu, amount, date)
            .then(_ => {
                window.api.incrementReturnedAmountBy(currentlyEditedItem.id_przedmiotu, amount)
                    .then(_ => {
                        handleClose();
                        reloadContracts();
                        dispatch(openNotification('Pomyślnie zwrócono towar'));
                    })
                    .catch(error => {
                        alert('Wystąpił błąd podczas zwracania towaru. Informacje o błędzie w konsoli.');
                        console.error(error);
                    })
            })
            .catch(error => {
                alert('Wystąpił błąd podczas zwracania towaru. Informacje o błędzie w konsoli.');
                console.error(error);
            })
        // window.api.incrementReturnedAmount
    }


    if (!currentlyEditedItem) return null;

    const isAmountValid = checkIfAmountRemaining(currentlyEditedItem, amount);

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Zwrot towaru</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box></Box>
                        <TextField
                            id="data"
                            label="Data"
                            type="text"
                            value={getToday()}
                        />
                        <TextField
                            id="amount"
                            label="Ilość"
                            inputProps={{ min: 1 }}
                            type="number"
                            defaultValue={1}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <TextField
                            id="client"
                            label="Nazwa towaru"
                            type="text"
                            error={isAmountValid}
                            helperText={isAmountValid && 'Nie ma tyle towaru na stanie'}
                            value={currentlyEditedItem.nazwa}
                        />
                    </Box>
                    <DialogActions>
                        <Button disabled={isAmountValid}
                            onClick={createReturn}>Zwróć towar</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default NewReturnModal