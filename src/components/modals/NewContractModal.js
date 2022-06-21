import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Autocomplete, TextField, Button
} from '@mui/material';
import { openNotification as showNotification } from '../../redux/notificationSlice';
import { loadContract, setScreen } from '../../redux/screenSlice';


export const NewContractModal = ({ isOpen, handleClose }) => {
    const [clients, setClients] = useState([])
    const [selectedClient, setSelectedClient] = useState({})

    const dispatch = useDispatch()

    useEffect(() => {
        // Get clients on open
        if (isOpen) {
            getClients()
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
            setClients(res)
        })
    }

    const openContract = (contract) => {
        console.log(contract)
        dispatch(loadContract(contract))
        dispatch(setScreen('przedmioty'))
    }

    const createContract = async (client) => {

        await window.api.createContract(client.id_klienta, getToday())
            .then(res => {
                const contractId = res[0]

                // Get contract object
                window.api.getContractsWithClients(contractId).then(res => {
                    const contract = res[0]
                    // Open the contract
                    openContract(contract)
                })

                // Show the notification
                dispatch(
                    showNotification(`Pomyślnie utworzono umowa dla: ${client.skrot}`)
                )

                // Close the modal
                handleClose();
            }).catch(error => {
                console.log(error)
                alert('fuck')
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
                        options={clients}
                        getOptionLabel={(clients) => clients.skrot}
                        onChange={(event, client) => {
                            if (client)
                                setSelectedClient(client)
                        }}
                        onInputChange={() => {
                            setSelectedClient(undefined)
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Szukaj komitenta" />)
                        }
                    />
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