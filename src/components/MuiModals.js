import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { IconButton, ListItem, ListItemButton, ListItemIcon, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import { InputAdornment } from '@mui/material';
import { ListItemText } from '@mui/material';
import { List } from '@mui/material';

const getToday = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today
}

export const NewSaleModalMUI = ({ isOpen, handleClose }) => {
    const [items, setItems] = useState([])
    const [currentItem, setCurrentItem] = useState()
    const [detailModalOpen, setDetailModalOpen] = React.useState(false);

    function openModal() {
        setDetailModalOpen(true);
    }

    function closeModal() {
        setDetailModalOpen(false);
    }

    useEffect(() => {
        setItems([])
    }, [setItems])

    const createSale = async (itemId) => {
        await window.api.createSale(itemId, getToday()).then(res => {
            console.log('Pomyślnie dodano sprzedaż')

            window.api.incrementSoldAmount(itemId).then(_ => {
                console.log('Pomyślnie zwiększono ilość sprzedanych sztuk')
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
                                <ListItemButton dense disabled={checkIfSoldOut(item) ? true : false}>
                                    <ListItemText
                                        onClick={() => createSale(item.id_przedmiotu)} primary={`${item.nazwa} - ${item.skrot}`}
                                        secondary={checkIfSoldOut(item) ? 'WYPRZEDANO' : ''} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
            </Dialog>
            <ItemDetailModalMUI isOpen={detailModalOpen} handleClose={closeModal} item={currentItem} />
        </div>
    );
}

export const NewContractModalMUI = ({ isOpen, handleClose }) => {
    const [clients, setClients] = useState([])

    useEffect(() => {
        getClients()
    }, [])

    const getClients = async () => {
        await window.api.getClients().then(res => {
            setClients(res)
        })
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Nowa umowa</DialogTitle>
                <DialogContent style={{ mt: 2, minWidth: 560 }}>
                    <Autocomplete
                        id="szukaj-klienta"
                        freeSolo
                        options={clients.map((client) => client.skrot)}
                        renderInput={(params) => <TextField {...params} label="Szukaj komitenta" />}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Zatwierdź</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export const ItemDetailModalMUI = ({ isOpen, handleClose, item }) => {
    if (!item) return null

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Szczegóły</DialogTitle>
                <DialogContent style={{ mt: 2, minWidth: 560 }}>
                    <p><b>ID:</b> {item.id_przedmiotu}</p>
                    <p><b>Nazwa:</b> {item.nazwa}</p>
                    <p><b>Komitent:</b> {item.imie} {item.nazwisko}</p>
                    <p><b>Skrót:</b> {item.skrot}</p>
                    <p><b>Przyjęta ilość:</b> {item.przyjetaIlosc}</p>
                    <p><b>Sprzedana ilość:</b> {item.sprzedanaIlosc}</p>
                    <p><b>Ilość w komisie:</b> {parseInt(item.przyjetaIlosc) - parseInt(item.sprzedanaIlosc)}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='contained'>Zamknij</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}