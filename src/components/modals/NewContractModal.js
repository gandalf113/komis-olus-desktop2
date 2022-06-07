import { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Autocomplete, TextField, Button
} from '@mui/material';

export const NewContractModal = ({ isOpen, handleClose }) => {
    const [clients, setClients] = useState([])

    useEffect(() => {
        // Get clients on open
        if (isOpen) {
            getClients()
        }
    }, [isOpen])

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

export default NewContractModal