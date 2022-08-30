import { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Autocomplete, TextField, Button, FormControlLabel,
    Switch,
    Typography
} from '@mui/material';
import { openNotification as showNotification } from '../../redux/notificationSlice';
import { ContractContext } from '../../context/contract-context';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { generateShort } from './NewClientModal';
import { ClientContext } from '../../context/client-context';


export const generateContractNumber = (allContracts, year) => {
    // Get all contracts for a given year
    const contractsThisYear = allContracts.filter(contract => contract.data.split('-')[0] === year.toString());

    // Get the prefix from last contract this year
    const lastContract = contractsThisYear[contractsThisYear.length - 1];
    const lastPrefix = !!lastContract ? Number.parseInt(lastContract.numer_umowy.split('/')[0]) : 0
    const prefix = lastPrefix + 1;
    return `${prefix}/${year}`
}

export const NewContractModal = ({ isOpen, handleClose }) => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState();

    // New client form data
    const [isNewClient, setIsNewClient] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [short, setShort] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { reloadContracts, allContracts } = useContext(ContractContext);
    const { reloadClients } = useContext(ClientContext);

    const contractNumber = generateContractNumber(allContracts, new Date().getFullYear());

    useEffect(() => {
        setFirstName('');
        setLastName('');
        setShort('');
        // Get clients on open
        if (isOpen) {
            getClients();
        }
    }, [isOpen])

    const toggleIsNewClient = () => {
        setIsNewClient(!isNewClient);
        setSelectedClient(undefined);
    };

    const getToday = () => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        return today
    }

    const getClients = async () => {
        await window.api.getClients().then(res => {
            setClients(res);
        })
    }

    const openContract = (contractId) => {
        navigate(`/contracts/${contractId}`)
    }

    const validateForm = () => {
        if (isNewClient) {
            if (firstName && lastName && short && firstName.trim() !== '' && lastName.trim() !== '') return true
            return false
        } else {
            if (selectedClient && selectedClient.id_klienta) return true
            return false
        }
    }

    const createContract = async (client) => {
        /**
         * Creates the contract in the database, refreshes the database, opens the contract, shows the notification
         * @param {Number} clientId - id of client with whom the contract is arranged
         * @param {String} contractNumber - number of the contract relative to the year like '142/2022'
         */
        const handleCreation = (clientId, contractNumber) => {
            window.api.createContract(clientId, contractNumber, getToday())
                .then(res => {
                    const contractId = res[0];

                    reloadContracts();

                    // Open the contract
                    openContract(contractId);

                    // Show the notification
                    dispatch(
                        showNotification(`Pomyślnie utworzono umowę ${contractNumber}`)
                    )

                    // Close the modal
                    handleClose();
                }).catch(error => {
                    console.log(error)
                    alert('Wystąpił błąd. Więcej informacji w konsoli.')
                })
        }

        if (!isNewClient) {
            // If we are creating a contract for EXISTING user
            handleCreation(client.id_klienta, contractNumber);
        } else {
            // If we are creating a contract for a NEW user
            // First, create the new user
            window.api.createClient(firstName, lastName, short)
                .then(res => {
                    // Refresh the clients
                    reloadClients();
                    console.log(res)

                    const clientId = res[0]
                    return clientId;
                })
                .catch(error => {
                })
                .then(clientId => {
                    // Create the contract now that we have a valid client
                    handleCreation(clientId, contractNumber)
                })
                .catch(error => {
                    alert('Nie udało się dodać klienta! Informacje o błędzie w konsoli.')
                    console.error(error)
                })
        }
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>
                    Nowa umowa
                </DialogTitle>

                <DialogContent style={{ minWidth: 560 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box></Box>
                        <TextField
                            id="numer-umowy"
                            label='Numer umowy'
                            value={contractNumber}
                        />
                        {!isNewClient && <Autocomplete
                            id="szukaj-klienta"
                            freeSolo
                            disabled={isNewClient}
                            options={clients}
                            getOptionLabel={(client) => client.skrot + " -  " + client.imie + " " + client.nazwisko}
                            onChange={(event, client) => {
                                if (client)
                                    setSelectedClient(client)
                            }}
                            onInputChange={() => {
                                setSelectedClient(undefined)
                            }}
                            renderInput={(params) => (
                                <TextField {...params} label="Szukaj klienta" />)
                            }
                        />}
                        <Box sx={{ display: `${isNewClient ? 'flex' : 'none'}`, flexDirection: 'column', gap: 1 }}>
                            <TextField
                                id="client-first-name-input"
                                label="Imię"
                                onChange={(e) => {
                                    setFirstName(e.target.value)

                                    generateShort(e.target.value, lastName)
                                        .then(res => setShort(res))
                                }}

                            />
                            <TextField
                                id="client-last-name-input"
                                label="Nazwisko"
                                onChange={(e) => {
                                    setLastName(e.target.value)

                                    generateShort(firstName, e.target.value)
                                        .then(res => setShort(res))
                                }}
                            />
                            <TextField
                                id="client-short-input"
                                label="Skrót"
                                type="text"
                                value={short}

                            />
                        </Box>
                    </Box>

                </DialogContent>
                <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormControlLabel
                        control={<Switch
                            checked={isNewClient}
                            onChange={toggleIsNewClient} />}
                        label={<Typography variant='button' color='gray'>Nowy klient?</Typography>} />

                    <Button onClick={async () => {
                        createContract(selectedClient)
                    }}
                        disabled={!validateForm()}
                    >Utwórz</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NewContractModal