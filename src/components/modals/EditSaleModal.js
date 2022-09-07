import React, { useContext, useEffect, useState } from 'react'
import {
    Dialog, DialogTitle, DialogContent, Box, Button,
    IconButton, ListItem, ListItemIcon, ListItemText, Autocomplete, TextField, DialogActions, Typography
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ItemDetailModal from './ItemDetailModal';
import { openNotification as showNotification } from '../../redux/notificationSlice';
import { useDispatch } from 'react-redux';
import { SalesContext } from '../../context/sales-context';
import { ContractContext } from '../../context/contract-context';
import { checkIfSoldOut, toCurrency, decToHex, calculatePrice } from '../../utils/miscUtils';

export const EditSaleModal = ({ isOpen, handleClose }) => {
    // Local state
    const [detailModalOpen, setDetailModalOpen] = useState(false);

    const [selectedItem, setSelectedItem] = useState();
    const [margin, setMargin] = useState('');
    const [price, setPrice] = useState('');

    const { reloadSales, currentlyEditedSale } = useContext(SalesContext);
    const { reloadContracts } = useContext(ContractContext);

    const dispatch = useDispatch();

    function openModal() {
        setDetailModalOpen(true);
    }

    function closeModal() {
        setDetailModalOpen(false);
    }

    useEffect(() => {
        if(currentlyEditedSale){
            loadItem(currentlyEditedSale);
            setMargin(currentlyEditedSale.marza)
        }

        clearItem();
    }, [isOpen, currentlyEditedSale]);


    useEffect(() => {
        if (selectedItem)
            setPrice(Number.parseFloat(margin) + Number.parseFloat(selectedItem.kwotaDlaKomitenta))
    }, [margin, selectedItem])

    const updateSale = async (item, margin) => {
        const price = calculatePrice(item.kwotaDlaKomitenta, margin);

        await window.api.updateSale(currentlyEditedSale.id_sprzedazy, margin, price).then(res => {
            reloadSales();
            reloadContracts();

            handleClose();
            dispatch(showNotification(`Pomyślnie zaktualizowano sprzedaż nr. ${currentlyEditedSale.id_sprzedazy}`))
        }).catch(error => {
            alert('Wystąpił błąd')
            console.log(error)
        })
    }

    /**
     * Get the detailed item
     * @param {Object} item - undetailed item object
     */
    const loadItem = (item) => {
        const itemId = decToHex(item.id_przedmiotu);
        window.api.getItemsDetailed(itemId).then(res => {
            const item = res[0];
            setSelectedItem(item);
        })
    }

    const clearItem = () => {
        setSelectedItem(null);
        setPrice('');
    }

    const showInfo = async (item) => {
        // setSelectedItem(item)
        openModal();
    }

    const validateForm = () => {
        return selectedItem && price && price > 0 && margin >= 0
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Edytuj sprzedaż</DialogTitle>
                <DialogContent sx={{ minWidth: 400 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box></Box>

                        <TextField
                            id="price-input"
                            type='number'
                            label="Marża [zł]"
                            disabled={!selectedItem}
                            value={margin}
                            onChange={(e) => {
                                setMargin(e.target.value);
                            }}

                        />
                        {selectedItem && <ListItem key={selectedItem.id_przedmiotu} disablePadding>
                            <ListItem dense disabled={checkIfSoldOut(selectedItem) ? false : false}>
                                <ListItemText
                                    primary={`${selectedItem.nazwa} - ${selectedItem.skrot}`}
                                    secondary={checkIfSoldOut(selectedItem) ? 'WYPRZEDANO' : ''} />
                            </ListItem>
                            <ListItemIcon>
                                <IconButton onClick={() => showInfo(selectedItem)}>
                                    <InfoIcon color='primary' />
                                </IconButton>
                            </ListItemIcon>
                        </ListItem>}

                    </Box>
                    <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='body2' color={validateForm() ? 'inherit' : 'lightgray'}>
                            <b>CENA: </b>{!!price ? toCurrency(price) : toCurrency(0)}
                        </Typography>
                        <Button disabled={!validateForm()} onClick={() => updateSale(selectedItem, margin)}>Zapisz</Button>
                    </DialogActions>

                </DialogContent>
            </Dialog>
            <ItemDetailModal isOpen={detailModalOpen} handleClose={closeModal} item={selectedItem} />
        </div>
    );
}

export default EditSaleModal