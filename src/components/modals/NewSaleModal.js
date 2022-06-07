import React, { useState, useEffect } from 'react'
import {
    Dialog, DialogTitle, DialogContent, OutlinedInput, InputAdornment,
    IconButton, List, ListItem, ListItemIcon, ListItemButton, ListItemText
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import ItemDetailModal from './ItemDetailModal';
import { openNotification as showNotification } from '../../redux/notificationSlice';
import { useDispatch } from 'react-redux';
import { getSalesData } from '../../redux/databaseSlice';

export const NewSaleModal = ({ isOpen, handleClose }) => {
    const [items, setItems] = useState([])
    const [currentItem, setCurrentItem] = useState()
    const [detailModalOpen, setDetailModalOpen] = React.useState(false);

    const dispatch = useDispatch()

    useEffect(() => {
        // Clear the items onOpen
        if (isOpen) {
            setItems([])
        }
    }, [setItems, isOpen])

    function openModal() {
        setDetailModalOpen(true);
    }

    function closeModal() {
        setDetailModalOpen(false);
    }

    const getToday = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today
    }

    const createSale = async (itemId) => {
        await window.api.createSale(itemId, getToday()).then(res => {
            console.log('Pomyślnie dodano sprzedaż')

            window.api.incrementSoldAmount(itemId).then(_ => {
                console.log('Pomyślnie zwiększono ilość sprzedanych sztuk')
                dispatch(showNotification('Pomyślnie sprzedano przedmiot'))
                dispatch(getSalesData())
            })
        }).catch(error => {
            alert('Wystąpił błąd')
            console.log(error)
        })
    }

    const getItems = async (searchValue) => {
        if (searchValue === "") {
            setItems([])
            return
        }

        await window.api.getClientsWithContractsAndItems(searchValue).then(res => {
            setItems(res)
        })
    }

    const showInfo = async (item) => {
        setCurrentItem(item)
        console.log(item)
        openModal()
    }

    const checkIfSoldOut = (item) => {
        const initAmount = item.przyjetaIlosc
        const soldAmount = item.sprzedanaIlosc
        const remainingAmount = initAmount - soldAmount

        return remainingAmount <= 0
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Nowa sprzedaż</DialogTitle>
                <DialogContent>
                    <OutlinedInput
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>}

                        onChange={(e) => {
                            getItems(e.target.value)

                        }}
                    />
                    <List>
                        {items.map(item => (
                            <ListItem key={item.id_przedmiotu} disablePadding>
                                <ListItemIcon>
                                    <IconButton onClick={() => showInfo(item)}>
                                        <InfoIcon color='primary' />
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemButton dense disabled={checkIfSoldOut(item) ? true : false}
                                    onClick={() => createSale(item.id_przedmiotu)} >
                                    <ListItemText
                                        primary={`${item.nazwa} - ${item.skrot}`}
                                        secondary={checkIfSoldOut(item) ? 'WYPRZEDANO' : ''} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>
            <ItemDetailModal isOpen={detailModalOpen} handleClose={closeModal} item={currentItem} />
        </div>
    );
}

export default NewSaleModal