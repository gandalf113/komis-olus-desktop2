import React, { useEffect, useState, useContext } from 'react'
import {
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Button
} from '@mui/material';
import { openNotification as showNotification } from '../../redux/notificationSlice';
import { ContractContext } from '../../context/contract-context';
import { calculatePrice } from '../../utils/miscUtils';

export const EditItemModal = ({ isOpen, handleClose }) => {
    // Local state
    const [name, setName] = useState('')
    const [amount, setAmount] = useState(1)
    const [commiterValue, setCommiterValue] = useState(0)
    const [margin, setMargin] = useState(0)
    const [price, setPrice] = useState(0)

    const { reloadContracts, currentlyEditedItem } = useContext(ContractContext);

    // Ustaw wartości pól
    useEffect(() => {
        if (currentlyEditedItem) {
            setName(currentlyEditedItem.nazwa)
            setCommiterValue(currentlyEditedItem.kwotaDlaKomitenta)
            setAmount(currentlyEditedItem.przyjetaIlosc)
            setMargin(currentlyEditedItem.domyslnaMarza)
        }
    }, [isOpen, currentlyEditedItem])

    useEffect(() => {
        const newPrice = calculatePrice(commiterValue, margin)
        setPrice(`${newPrice} zł`)
    }, [commiterValue, margin])

    const validateForm = () => {
        return name.trim !== '' && amount >= 1 && commiterValue && commiterValue > 0 &&
            price
    }

    /**
 *
 * @param {string} name - item name
 * @param {number} commiterValue - amount of money for the commiter
 * @param {number} defaultMargin - profit for the company
 * @param {int} amount - how many items of this kind has the commiter brought
 */
    const updateItem = async (itemId, name, commiterValue, defaultMargin, amount) => {
        window.api.updateItem(itemId, name, amount, commiterValue, defaultMargin)
            .then(_ => {
                // Close
                handleClose();
                // Refresh the contracts
                reloadContracts();
                // Show success notification
                showNotification(`Pomyślnie zaktualizowano przedmiot: ${name}`)
            })
            .catch(error => {
                alert('Nie udało się zaktualizować przedmiotu! Informacje o błędzie w konsoli.')
                console.error(error)
            })
    }

    /**
     * Removes an item from the database
     * @param {Number} itemId - id of the item to remove
     */
    const deleteItem = async (itemId) => {
        window.api.deleteItem(itemId)
            .then(_ => {
                // Close the window
                handleClose();
                // Refresh the contracts
                reloadContracts();
                // Show success notification
                showNotification(`Usunięto przedmiot: ${name}`)
            })
            .catch(error => {
                alert('Nie udało się usunąć przedmiotu! Informacje o błędzie w konsoli.')
                console.error(error)
            })
    }


    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Edycja towaru</DialogTitle>
                <DialogContent style={{ mt: 2, minWidth: 560 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <TextField
                            id="item-name-input"
                            label="Nazwa przedmiotu"
                            variant="filled"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="item-amount-input"
                            label="Przyjęta ilość"
                            type="number"
                            defaultValue={1}
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                        />
                        <TextField
                            id="item-committer-value-input"
                            label="Kwota dla komitenta [zł]"
                            type="number"
                            defaultValue={'0.00'}
                            value={commiterValue}
                            onChange={(e) => setCommiterValue(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 0.01
                            }}
                            variant="filled"
                        />
                        <TextField
                            id="item-margin-input"
                            label="Domyślna marża [zł]"
                            type="number"
                            defaultValue={'0.00'}
                            value={margin}
                            onChange={(e) => setMargin(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 0.01
                            }}
                            variant="filled"
                        />
                        <TextField
                            id="item-price-input-noneditable"
                            label="Cena"
                            type="text"
                            value={price}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                        />

                    </Box>
                    <DialogActions>
                        <Button onClick={() => {
                            deleteItem(currentlyEditedItem.id_przedmiotu);
                        }} color='error'>Usuń</Button>
                        <Button onClick={() => {
                            handleClose()
                        }}>Odrzuć</Button>
                        <Button onClick={() => {
                            updateItem(currentlyEditedItem.id_przedmiotu, name, commiterValue, margin, amount)
                        }} disabled={!validateForm()}>Zapisz</Button>
                    </DialogActions>

                </DialogContent>
            </Dialog>
        </div >
    );
}

export default EditItemModal