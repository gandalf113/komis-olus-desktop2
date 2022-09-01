import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const ClientSummaryScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [contracts, setContracts] = useState();
    const [client, setClient] = useState();

    useEffect(() => {
        window.api.getClient(id).then(res => {
            setClient(res[0]);
        });

        window.api.getClientsContracts(id).then(res => {
            setContracts(res);
        });
    }, [])

    if (!contracts || !client) return null

    const handleOpenClientContracts = () => {
        navigate(`/clients/${id}`);
    }


    return (
        <div>
            <Box style={{ alignItems: 'center', marginBottom: 12 }}>
                <Typography variant='h5'>{client.imie} {client.nazwisko} - {client.skrot}</Typography>
                <Button onClick={handleOpenClientContracts}
                    style={{ marginTop: 10, marginBottom: 10 }} color='secondary' variant='contained'>Pokaż umowy</Button>
            </Box>
        </div>
    )
}

export default ClientSummaryScreen