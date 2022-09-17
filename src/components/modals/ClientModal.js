import React, { useContext, useEffect, useState } from 'react'
import {
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Button
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { openNotification as showNotification } from '../../redux/notificationSlice';
import { toggleEditClientModal } from '../../redux/modalSlice';
import { ClientContext } from '../../context/client-context';

/**
* Generates a abbreviation from customer's first and last name
* by combining last name's first two letter with first name's first two letters
* @param {string} firstName
* @param {string} lastName
* @returns {string} abbreviation, for example person named John Smith will have short: 'smjo1'
*/
export const generateShort = async (firstName, lastName) => {
    firstName = firstName.trim();
    lastName = lastName.trim();
    if (firstName === '' || lastName === '' || !firstName || !lastName) return '';

    // Concatenate last name's two first letters with first name's two first letters
    var short = lastName.substring(0, 2) + firstName.substring(0, 2)
    short = short.toLowerCase()

    // At the end of each short, add a number
    // So that each abbreviation can be unique
    function findFreeSuffix(suffix_number) {
        var final_short = short + suffix_number

        // Scan the database in search for person with this short
        return window.api.searchClientExact(final_short).then(res => {
            if (res.length > 0) {
                // If this abbreviation is taken...
                return findFreeSuffix(suffix_number + 1)
            } else {
                console.log(suffix_number) // <- This prints the correct result, but I'm unable to return it
                return suffix_number
            }
        })
    }

    const suffix = await findFreeSuffix(1)

    return short + suffix
}

export const ClientModal = ({ isOpen, handleClose }) => {
    const dispatch = useDispatch();

    const { reloadClients } = useContext(ClientContext);
    const { clientModal } = useSelector(state => state.modal);

    // Local state
    const [clientId, setClientId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [short, setShort] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    // Load the values on open
    useEffect(() => {
        setClientId(clientModal.edit ? clientModal.client.id_klienta : '');
        setFirstName(clientModal.edit ? clientModal.client.imie : '');
        setLastName(clientModal.edit ? clientModal.client.nazwisko : '');
        setShort(clientModal.edit ? clientModal.client.skrot : '');
        setAddress(clientModal.edit ? clientModal.client.adres : '');
        setPhone(clientModal.edit ? clientModal.client.nr_tel : '');
    }, [isOpen]);


    const updateClient = async () => {
        const clientId = clientModal.client.id_klienta;

        window.api.updateClient(clientId, firstName, lastName, short, address, phone)
            .then(_ => {
                // Close the modal
                handleClose();
                // Refresh the clients
                reloadClients();
                // Show success notification
                dispatch(showNotification(`Pomyślnie zaktualizowano klienta: ${short}`))
            })
            .catch(error => {
                alert('Nie udało się dodać klienta! Informacje o błędzie w konsoli.')
                console.error(error)
            })
    }

    const createClient = async () => {
        window.api.createClient(firstName, lastName, short, address, phone)
            .then(_ => {
                // Close the modal
                handleClose();
                // Refresh the clients
                reloadClients();
                // Show success notification
                dispatch(showNotification(`Pomyślnie dodano klienta: ${short}`))
            })
            .catch(error => {
                alert('Nie udało się dodać klienta! Informacje o błędzie w konsoli.')
                console.error(error)
            })
    }


    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>{clientModal.edit ? 'Edytuj klienta' : 'Nowy klient'}</DialogTitle>
                <DialogContent style={{ mt: 2, minWidth: 560 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <TextField
                            id="client-first-name-input"
                            label="Imię"
                            variant="filled"
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value)

                                generateShort(e.target.value, lastName)
                                    .then(res => setShort(res))
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="client-last-name-input"
                            label="Nazwisko"
                            variant="filled"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value)

                                generateShort(firstName, e.target.value)
                                    .then(res => setShort(res))
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="client-address-input"
                            label="Adres"
                            variant="filled"
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value)
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="client-phone-input"
                            label="Numer Telefonu"
                            variant="filled"
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value)
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="client-short-input"
                            label="Skrót"
                            type="text"
                            value={short}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                        />
                    </Box>
                    <DialogActions>
                        <Button onClick={clientModal.edit ? updateClient : createClient}>
                            {clientModal.edit ? 'Zapisz' : 'Dodaj'}
                        </Button>
                    </DialogActions>

                </DialogContent>
            </Dialog>
        </div >
    );
}

export default ClientModal