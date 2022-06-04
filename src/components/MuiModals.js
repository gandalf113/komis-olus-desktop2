import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { ListItem, ListItemButton, OutlinedInput } from '@mui/material';
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
    const [searchValue, setSearchValue] = useState()

    useEffect(() => {
        setItems([])
        setSearchValue('')
    }, [setItems])

    const createSale = async (itemId) => {
        if (itemId === -1) return

        await window.api.createSale(itemId, getToday()).then(res => {
            alert('Pomyślnie dodano sprzedaż')

            window.api.incrementSoldAmount(itemId).then(_ => {
                alert('Pomyślnie zwiększono ilość sprzedanych sztuk')
            })
        })
    }

    const getItems = async () => {
        if (searchValue === "") {
            setItems([])
            return
        }

        await window.api.getClientsWithContractsAndItems(searchValue).then(res => {
            setItems(res)
        })
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Nowa sprzedaż</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/* To subscribe to this website, please enter your email address here. We
                        will send updates occasionally. */}
                    </DialogContentText>
                    <OutlinedInput
                        id="outlined-adornment-weight"
                        endAdornment={<InputAdornment position="end">
                            <Button onClick={getItems}>Szukaj</Button>
                        </InputAdornment>}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <List>
                        {items.map(item => (
                            <ListItem key={item.id_przedmiotu} secondaryAction={
                                <Button onClick={() => createSale(item.id_przedmiotu)}>Wybierz</Button>
                            } disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={`${item.nazwa} - ${item.skrot}`} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose} variant='contained'>Zatwierdź</Button>
                </DialogActions> */}
            </Dialog>
        </div>
    );
}

export const NewContractModalMUI = ({ isOpen, handleClose }) => {
    const [clients, setClients] = useState([])

    useEffect(() => {
        getClients()
    })

    const getClients = async () => {
        await window.api.getClients().then(res => {
            setClients(res)
        })
    }

    // if (!clients) return null

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Nowa umowa</DialogTitle>
                <DialogContent style={{ mt: 2, minWidth: 560 }}>
                    <DialogContentText>
                        {/* To subscribe to this website, please enter your email address here. We
                        will send updates occasionally. */}
                    </DialogContentText>
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
