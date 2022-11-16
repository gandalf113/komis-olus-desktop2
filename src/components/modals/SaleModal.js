import React, { useContext, useEffect, useState } from 'react'
import {
    Dialog, DialogTitle, DialogContent, Box, Button,
    IconButton, ListItem, ListItemIcon, ListItemText, Autocomplete, TextField, DialogActions, Typography
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ItemDetailModal from './ItemDetailModal';
import { openNotification as showNotification } from '../../redux/notificationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SalesContext } from '../../context/sales-context';
import { ContractContext } from '../../context/contract-context';
import { formatDateToYyyyMmDd, getToday } from '../../utils/date-utils';
import { checkIfSoldOut, toCurrency, decToHex, calculatePrice } from '../../utils/misc-utils';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import locale from 'date-fns/locale/pl'

export const SaleModal = ({ isOpen, handleClose }) => {
    // Local state
    const [detailModalOpen, setDetailModalOpen] = useState(false);

    const { saleModal } = useSelector(state => state.modal);

    const [selectedItem, setSelectedItem] = useState();
    const [items, setItems] = useState();
    const [margin, setMargin] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState(new Date());

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
        if (saleModal.edit) {
            setDate(new Date(saleModal.sale.data_sprzedazy))
            loadItem(saleModal.sale.id_przedmiotu)
        } else {
            setDate(new Date())

            window.api.getItems().then(items => {
                setItems(items);
            });

            clearItem();
        }
    }, [isOpen]);


    useEffect(() => {
        if (selectedItem)
            setPrice(Number.parseFloat(margin) + Number.parseFloat(selectedItem.kwotaDlaKomitenta))
    }, [margin, selectedItem])

    const createSale = async (item, margin) => {
        const price = calculatePrice(item.kwotaDlaKomitenta, margin);
        console.log(date)

        const itemId = item.id_przedmiotu;
        const itemName = item.nazwa;

        await window.api.createSale(itemId, margin, price, formatDateToYyyyMmDd(date)).then(res => {
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

    const updateSale = async (item, margin, date) => {
        console.log("Hello wTF?")
        const price = calculatePrice(item.kwotaDlaKomitenta, margin);
        const sale = saleModal.sale

        await window.api.updateSale(sale.id_sprzedazy, margin, price, formatDateToYyyyMmDd(date)).then(res => {
            reloadSales();
            reloadContracts();

            handleClose();
            dispatch(showNotification(`Pomyślnie zaktualizowano sprzedaż nr. ${sale.id_sprzedazy}`))
        }).catch(error => {
            alert('Wystąpił błąd')
            console.log(error)
        })
    }

    /**
     * Get the detailed item
     * @param {Number} itemId - itemId in decimal
     */
    const loadItem = (itemId) => {
        const itemIdHex = decToHex(itemId);
        window.api.getItemsDetailed(itemIdHex).then(res => {
            const item = res[0];
            setSelectedItem(item);
            setMargin(saleModal.edit ? saleModal.sale.marza : item.domyslnaMarza)
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
            && (!checkIfSoldOut(selectedItem) || saleModal.edit)
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>{saleModal.edit ? 'Edytuj sprzedaż' : 'Nowa sprzedaż'}</DialogTitle>
                <DialogContent sx={{ minWidth: 400 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box></Box>
                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
                            <DatePicker
                                label="Data sprzedaży"
                                value={date}
                                onChange={(newDate) => {
                                    console.log(formatDateToYyyyMmDd(newDate))
                                    setDate(newDate);
                                }}
                                renderInput={(params) => <TextField {...params} />} />
                        </LocalizationProvider>
                        {!saleModal.edit && <Autocomplete
                            id='search-item'
                            options={items}
                            getOptionLabel={(item) => decToHex(item.id_przedmiotu) + ` (${item.nazwa})`}
                            onChange={(event, item) => {
                                if (item)
                                    loadItem(item.id_przedmiotu);
                                else
                                    clearItem();
                            }}
                            renderInput={(params) => (
                                <TextField {...params}
                                    label='Wprowadź kod z metki' />
                            )}
                        />}
                        <TextField
                            id="price-input"
                            type='number'
                            label="Prowizja [zł]"
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
                        <Button disabled={!validateForm()} onClick={() => {
                            if (saleModal.edit) updateSale(selectedItem, margin, date);
                            else createSale(selectedItem, margin)
                        }}>
                            {saleModal.edit ? 'Zapisz' : 'Sprzedaj'}</Button>
                    </DialogActions>

                </DialogContent>
            </Dialog>
            <ItemDetailModal isOpen={detailModalOpen} handleClose={closeModal} item={selectedItem} />
        </div>
    );
}

export default SaleModal