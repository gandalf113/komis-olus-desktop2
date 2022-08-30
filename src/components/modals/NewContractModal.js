import { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Autocomplete, TextField, Button
} from '@mui/material';
import { openNotification as showNotification } from '../../redux/notificationSlice';
import { loadContract, setScreen } from '../../redux/screenSlice';
import { ContractContext } from '../../context/contract-context';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';


const generateContractNumber = (allContracts, year) => {
    // Get all contracts for a given year
    console.log(allContracts)
    const contractsThisYear = allContracts.filter(contract => contract.data.split('-')[0] === year.toString());
    // Get the prefix based on how many contracts were made this year
    const prefix = contractsThisYear.length + 1;
    return `${prefix}/${year}`
}

export const NewContractModal = ({ isOpen, handleClose }) => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { reloadContracts, allContracts } = useContext(ContractContext);

    const contractNumber = generateContractNumber(allContracts, new Date().getFullYear());

    useEffect(() => {
        // Get clients on open
        if (isOpen) {
            getClients();
        }
    }, [isOpen])

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

    const createContract = async (client) => {
        await window.api.createContract(client.id_klienta, contractNumber, getToday())
            .then(res => {
                const contractId = res[0];

                reloadContracts();

                // Open the contract
                openContract(contractId);

                // Show the notification
                dispatch(
                    showNotification(`Pomyślnie utworzono umowa dla: ${client.skrot}`)
                )

                // Close the modal
                handleClose();
            }).catch(error => {
                console.log(error)
                alert('Wystąpił błąd. Więcej informacji w konsoli.')
            })
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle>Nowa umowa</DialogTitle>
                <DialogContent style={{ minWidth: 560 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box></Box>
                        <TextField
                            id="numer-umowy"
                            label='Numer umowy'
                            value={contractNumber}
                        />
                        <Autocomplete
                            id="szukaj-klienta"
                            freeSolo
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
                        />

                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={async () => {
                        if (selectedClient) {
                            createContract(selectedClient)
                        }
                    }}
                        disabled={selectedClient === undefined}
                    >Utwórz</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NewContractModal