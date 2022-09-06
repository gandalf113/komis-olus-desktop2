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
import { getToday } from '../../utils/date-utils';
import { checkIfSoldOut, toCurrency, decToHex, calculatePrice } from '../../utils/miscUtils';

export const NewSaleModal = ({ isOpen, handleClose }) => {
    // Local state
    const [detailModalOpen, setDetailModalOpen] = useState(false);

    const [selectedItem, setSelectedItem] = useState();
    const [items, setItems] = useState();
    const [margin, setMargin] = useState('');
    const [price, setPrice] = useState('');

    const { reloadSales } = useContext(SalesContext);
    const { reloadContracts } = useContext(ContractContext);


    const dispatch = useDispatch();

    function openModal() {
        setDetailModalOpen(true);
    }

    function closeModal() {
        setDetailModalOpen(false);
    }

    useEffect(() => {
        window.api.getItems().then(items => {
            setItems(items);
        });

        clearItem();
    }, [isOpen]);


    useEffect(() => {
        if (selectedItem)
            setPrice(Number.parseFloat(margin) + Number.parseFloat(selectedItem.kwotaDlaKomitenta))
    }, [margin, selectedItem])

    const createSale = async (item, margin) => {
        const price = calculatePrice(item.kwotaDlaKomitenta, margin);

        const itemId = item.id_przedmiotu;
        const itemName = item.nazwa;

        await window.api.createSale(itemId, margin, price, getToday()).then(res => {
            console.log('Pomyślnie dodano sprzedaż')

            window.api.incrementSoldAmount(itemId).then(_ => {
                console.log('Pomyślnie zwiększono ilość sprzedanych sztuk')
                dispatch(showNotification(`Pomyślnie sprzedano przedmiot: "${itemName}"`))
                handleClose();
            })

            reloadSales();
            reloadContracts();
        }).catch(error => {
            alert('Wystąpił błąd')
            console.log(error)
        })
    }

    /**
     * Get the detailed item
     * @param {String} itemId - itemId in hex
     */
    const loadItem = (item) => {
        const itemId = decToHex(item.id_przedmiotu);
        window.api.getItemsDetailed(itemId).then(res => {
            const item = res[0];
            setSelectedItem(item);
            setMargin(item.domyslnaMarza)
        })
    }

    const clearItem = () => {
        setSelectedItem(null);
        setPrice('');
        setMargin('');
    }

    const showInfo = async (item) => {
        // setSelectedItem(item)
        openModal();
    }

    const validateForm = () => {
        return selectedItem && price && price > 0 && margin >= 0
            && !checkIfSoldOut(selectedItem)
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Nowa sprzedaż</DialogTitle>
                <DialogContent sx={{ minWidth: 400 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box></Box>
                        <Autocomplete
                            id='search-item'
                            options={items}
                            getOptionLabel={(item) => decToHex(item.id_przedmiotu) + ` (${item.nazwa})`}
                            onChange={(event, item) => {
                                if (item)
                                    loadItem(item);
                                else
                                    clearItem();
                            }}
                            renderInput={(params) => (
                                <TextField {...params}
                                    label='Wprowadź kod z metki' />
                            )}
                        />
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
                            <ListItemIcon>
                                <IconButton onClick={() => showInfo(selectedItem)}>
                                    <InfoIcon color='primary' />
                                </IconButton>
                            </ListItemIcon>
                            <ListItem dense disabled={checkIfSoldOut(selectedItem) ? true : false}>
                                <ListItemText
                                    primary={`${selectedItem.nazwa} - ${selectedItem.skrot}`}
                                    secondary={checkIfSoldOut(selectedItem) ? 'WYPRZEDANO' : ''} />
                            </ListItem>
                        </ListItem>}
                    </Box>
                    <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant='body2' color={validateForm() ? 'inherit' : 'lightgray'}>
                            <b>CENA: </b>{!!price ? toCurrency(price) : toCurrency(0)}
                        </Typography>
                        <Button disabled={!validateForm()} onClick={() => createSale(selectedItem, margin)}>Sprzedaj</Button>
                    </DialogActions>

                </DialogContent>
            </Dialog>
            <ItemDetailModal isOpen={detailModalOpen} handleClose={closeModal} item={selectedItem} />
        </div>
    );
}

export default NewSaleModal