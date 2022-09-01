import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { SalesContext } from '../context/sales-context';
import { toCurrency } from '../utils/miscUtils';


const getSumOfSales = (items) => {
    let sum = 0;
    for (const item of items) {
        sum += item.sprzedanaIlosc * item.kwotaDlaKomitenta;
    }
    return sum;
}

/**
 * Wypłaty klienta
 * Client's money withdraws
 */
const ClientSummaryScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [client, setClient] = useState();
    const [items, setItems] = useState();

    const { allSales } = useContext(SalesContext);

    useEffect(() => {
        window.api.getClient(id).then(res => {
            setClient(res[0]);
        });
    }, [])

    useEffect(() => {
        window.api.getItemsForGivenClient(id).then(res => {
            console.log(res);
            setItems(res);
        })
    }, [allSales]);

    if (!client || !items) return null

    const handleOpenClientContracts = () => {
        navigate(`/clients/${id}`);
    }

    return (
        <div>
            <Box style={{ alignItems: 'center', marginBottom: 12 }}>
                <Typography variant='h5'>{client.imie} {client.nazwisko} - {client.skrot}</Typography>
                <Button onClick={handleOpenClientContracts}
                    style={{ marginTop: 10, marginBottom: 10 }} color='secondary' variant='contained'>Pokaż umowy</Button>
                <Button style={{ margin: 10 }} color='inherit' variant='contained'>Dodaj wypłatę</Button>
            </Box>
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='body'>Suma sprzedaży: {toCurrency(getSumOfSales(items))} </Typography>
                <Typography variant='body'>Do wypłaty: {toCurrency(getSumOfSales(items))} </Typography>

            </Box>
        </div>
    )
}

export default ClientSummaryScreen