import React, { useEffect, useState, useContext } from 'react'
import {
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Button
} from '@mui/material';
import { openNotification as showNotification } from '../../redux/notificationSlice';
import { ContractContext } from '../../context/contract-context';
import { calculatePrice } from '../../utils/misc-utils';
import { useSelector } from 'react-redux';

export const ItemModal = ({ isOpen, handleClose }) => {
    // Local state
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [soldAmount, setSoldAmount] = useState(0);
    const [commiterValue, setCommiterValue] = useState('');
    const [margin, setMargin] = useState(0);
    const [price, setPrice] = useState('0.00');

    const { reloadContracts } = useContext(ContractContext);
    const { itemModal } = useSelector(state => state.modal);

    // Ustaw wartości pól
    useEffect(() => {
        setName(itemModal.edit ? itemModal.item.nazwa : '');
        setCommiterValue(itemModal.edit ? itemModal.item.kwotaDlaKomitenta : '');
        setAmount(itemModal.edit ? itemModal.item.przyjetaIlosc : '');
        setSoldAmount(itemModal.edit ? itemModal.item.sprzedanaIlosc : 0);
        setMargin(itemModal.edit ? itemModal.item.domyslnaMarza : 0);
    }, [isOpen, itemModal])

    useEffect(() => {
        const newPrice = calculatePrice(commiterValue, margin);

        if (newPrice === 'NaN') setPrice('');
        else setPrice(`${newPrice} zł`);
    }, [commiterValue, margin])


    /**
     *
     * @param {string} name - item name
     * @param {number} commiterValue - amount of money for the commiter
     * @param {number} defaultMargin - profit for the company
     * @param {int} amount - how many items of this kind has the commiter brought
     */
    const createItem = async (name, commiterValue, defaultMargin, amount) => {
        const contract = itemModal.contract;

        window.api.createItem(name, amount, commiterValue, defaultMargin, contract.id_umowy)
            .then(_ => {
                // Close the modal
                handleClose();
                // Refresh the contract
                reloadContracts();
                // Show success notification
                showNotification(`Pomyślnie dodano przedmiot do umowy ${contract.skrot}`)
            })
            .catch(error => {
                alert('Nie udało się dodać przedmiotu! Informacje o błędzie w konsoli.')
                console.error(error)
            })
    }


    /**
 *
 * @param {string} name - item name
 * @param {number} commiterValue - amount of money for the commiter
 * @param {number} defaultMargin - profit for the company
 * @param {int} amount - how many items of this kind has the commiter brought
 */
    const updateItem = async (itemId, name, commiterValue, defaultMargin, amount, soldAmount) => {
        window.api.updateItem(itemId, name, amount, soldAmount, commiterValue, defaultMargin)
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

    const validateSoldAmount = () => {
        return soldAmount <= amount && soldAmount >= 0;
    }

    const validateForm = () => {
        return name.trim !== '' && amount >= 1 && commiterValue && commiterValue > 0 &&
            price && validateSoldAmount()
    }


    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>{itemModal.edit ? 'Edycja towaru' : 'Nowy towar'}</DialogTitle>
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
                        {itemModal.edit ? <TextField
                            id="item-sold-amount-input"
                            label="Sprzedana ilość"
                            type="number"
                            value={soldAmount}
                            onChange={(e) => setSoldAmount(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 1,
                                min: 0
                            }}
                            error={!validateSoldAmount()}
                            variant="filled"
                        /> : null
                        }
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
                        {itemModal.edit ?
                            <>
                                <TextField
                                    id="item-margin-input"
                                    label="Domyślna prowizja [zł]"
                                    type="number"
                                    defaultValue={'0.00'}
                                    value={margin}
                                    onChange={(e) => setMargin(e.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    inputProps={{
                                        step: 0.01,
                                        min: 0
                                    }}
                                    variant="filled"
                                />
                                <TextField
                                    id="item-price-input-noneditable"
                                    label="Cena"
                                    type="text"
                                    placeholder='0.00 zł'
                                    value={price}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="filled"
                                />
                            </> : null
                        }

                    </Box>
                    <DialogActions>
                        {itemModal.edit && <Button onClick={() => {
                            deleteItem(itemModal.item.id_przedmiotu);
                        }} color='error'>Usuń</Button>}
                        <Button onClick={() => {
                            handleClose()
                        }}>Odrzuć</Button>
                        <Button onClick={() => {
                            if (itemModal.edit) updateItem(itemModal.item.id_przedmiotu, name, commiterValue, margin, amount, soldAmount);
                            else createItem(name, commiterValue, margin, amount);
                        }} disabled={!validateForm()}>Zapisz</Button>
                    </DialogActions>

                </DialogContent>
            </Dialog>
        </div >
    );
}

export default ItemModal