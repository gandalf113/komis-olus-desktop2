import React, { useEffect, useState, useContext } from 'react'
import {
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Button
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { openNotification as showNotification } from '../../redux/notificationSlice';
import { toggleNewItemModal } from '../../redux/modalSlice';
import { getContractDetail } from '../../redux/databaseSlice';
import { useParams, useLocation } from 'react-router-dom';
import { calculatePrice } from '../../utils/miscUtils';
import { ContractContext } from '../../context/contract-context';


export const NewItemModal = ({ isOpen, handleClose }) => {
    // Local state
    const [name, setName] = useState('')
    const [amount, setAmount] = useState(1)
    const [commiterValue, setCommiterValue] = useState(0)
    const [margin, setMargin] = useState(0)
    const [price, setPrice] = useState()

    // Redux
    const { currentContract: contract } = useSelector(state => state.screen)

    const { currentContractID, reloadContracts } = useContext(ContractContext);


    // Reset the values on open
    useEffect(() => {
        setName('')
        setCommiterValue(0)
        setMargin(0)
        setAmount(1)
        setPrice('0.00')
    }, [isOpen])

    const dispatch = useDispatch()

    const validateForm = () => {
        return name.trim !== '' && amount >= 1 && commiterValue && commiterValue > 0 &&
            price
    }

    useEffect(() => {
        const newPrice = calculatePrice(commiterValue, margin)
        setPrice(`${newPrice} zł`)
    }, [commiterValue, margin])

    /**
     *
     * @param {string} name - item name
     * @param {number} commiterValue - amount of money for the commiter
     * @param {number} defaultMargin - profit for the company
     * @param {int} amount - how many items of this kind has the commiter brought
     */
    const createSale = async (name, commiterValue, defaultMargin, amount) => {
        const contractId = currentContractID;

        window.api.createItem(name, amount, commiterValue, defaultMargin, contractId)
            .then(_ => {
                // Close the modal
                dispatch(toggleNewItemModal(false))
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
                        <TextField
                            id="item-committer-value-input"
                            label="Kwota dla komitenta [zł]"
                            type="number"
                            placeholder='0.00'
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
                            label="Marża"
                            type="number"
                            placeholder='0.00'
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
                            handleClose()
                        }}>Odrzuć</Button>
                        <Button onClick={() => {
                            createSale(name, commiterValue, margin, amount)
                        }} disabled={!validateForm()}>Zapisz</Button>
                    </DialogActions>

                </DialogContent>
            </Dialog>
        </div >
    );
}

export default NewItemModal