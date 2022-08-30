import React, { useContext, useEffect, useState } from 'react'
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Autocomplete, TextField, Button, FormControlLabel,
    Switch, Box, Typography
} from '@mui/material';
import { ContractContext } from '../../context/contract-context'
import { openNotification as showNotification } from '../../redux/notificationSlice';

const EditContractModal = ({ isOpen, handleClose }) => {
    const { currentlyEditedContract, reloadContracts } = useContext(ContractContext);


    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState();


    useEffect(() => {
        const getClients = async () => {
            window.api.getClients().then(res => {
                setClients(res);
            })
        }

        getClients();
    }, []);

    useEffect(() => {
        const fetchSelectedClient = async () => {
            if (!currentlyEditedContract) return;
            window.api.getClient(currentlyEditedContract.id_klienta).then(res => {
                setSelectedClient(res[0]);
            });
        }
        fetchSelectedClient();
    }, [currentlyEditedContract])



    let contractNumber;
    if (currentlyEditedContract) {
        contractNumber = currentlyEditedContract.numer_umowy;
    } else {
        return null;
    }

    const updateContract = (clientId) => {
        window.api.updateContract(currentlyEditedContract.id_umowy, clientId)
            .then(_ => {
                handleClose();
                reloadContracts();
                showNotification(`Pomyślnie zaktualizowano umowę ${currentlyEditedContract.numer_umowy}`)
            })
            .catch(error => {
                alert('Nie udało się zaktualizować umowy! Informacje o błędzie w konsoli.')
                console.error(error)
            });
    }

    if (!selectedClient) return null

    return (
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
                    <Autocomplete
                        id="szukaj-klienta"
                        freeSolo
                        options={clients}
                        value={selectedClient}
                        getOptionLabel={(client) => client.skrot + " -  " + client.imie + " " + client.nazwisko}
                        onChange={(event, client) => {
                            if (client){
                                setSelectedClient(client)
                            }
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Szukaj klienta" />)
                        }
                    />
                </Box>

            </DialogContent>
            <DialogActions>


                <Button onClick={async () => {
                    updateContract(selectedClient.id_klienta);
                    // if (selectedClient) {
                    //     createContract(selectedClient)
                    // }
                }}
                >Zapisz</Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditContractModal