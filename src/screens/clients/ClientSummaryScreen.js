import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { SalesContext } from '../../context/sales-context';
import { toCurrency } from '../../utils/misc-utils';
import { useDispatch } from 'react-redux';
import { setWithdrawModal } from '../../redux/modalSlice';
import { DataTable } from '../../components/DataTable';
import { WithdrawContext } from '../../context/withdraw-context';


const getSumOfSales = (items) => {
    let sum = 0;
    for (const item of items) {
        sum += item.sprzedanaIlosc * item.kwotaDlaKomitenta;
    }
    return sum;
}

/**
 * How much money does the client have on his account to withdraw?
 * @param {Array} items
 * @param {Array} withdraws
 * @returns {Number} - amount that the client can withdraw
 */
const getWithdrawAmount = (sumOfSales, withdraws) => {
    let sumOfWithdraws = 0;
    for (const withdraw of withdraws) {
        sumOfWithdraws += withdraw.kwota;
    }

    return sumOfSales - sumOfWithdraws;
}

/**
 * Wypłaty klienta
 * Client's money withdraws
 */
const ClientSummaryScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [client, setClient] = useState();
    const [items, setItems] = useState();
    const [withdraws, setWithdraws] = useState();

    const { allSales } = useContext(SalesContext);
    const { allWithdraws } = useContext(WithdrawContext);

    /**
     * Get client detail
     */
    useEffect(() => {
        window.api.getClient(id).then(res => {
            setClient(res[0]);
        });
    }, [id])

    /**
     * Get all items for this client
     */
    useEffect(() => {
        window.api.getItemsForGivenClient(id).then(res => {
            setItems(res);
        });
    }, [id, allSales]);

    /**
     * Get withdraws
     */
    useEffect(() => {
        window.api.getWithdrawsForGivenClient(id).then(res => {
            setWithdraws(res);
        });
    }, [id, allWithdraws]);

    const columms = useMemo(
        () => [
            {
                Header: 'Id',
                accessor: 'id_wyplaty',
            },
            {
                Header: 'Kwota',
                accessor: 'kwota',
                Cell: props => <Typography variant='body'>{toCurrency(props.value)}</Typography>
            },
            {
                Header: 'Data wypłaty',
                accessor: 'data',
            },
        ],
        []
    )

    if (!client || !items || !withdraws) return null

    const sumOfSales = getSumOfSales(items);


    const handleOpenNewWithdrawModal = () => {
        dispatch(setWithdrawModal({
            isOpen: true,
            edit: false,
            client: client,
            withdrawableAmount: getWithdrawAmount(sumOfSales, withdraws)
        }));
    }


    return (
        <div>
            <Box style={{ alignItems: 'center' }}>
                {/* <Typography variant='h5'>{client.imie} {client.nazwisko} - {client.skrot}</Typography>
                <Button onClick={handleOpenClientContracts}
                    style={{ marginTop: 10, marginBottom: 10 }} color='secondary' variant='contained'>Pokaż umowy</Button> */}
            </Box>
            <DataTable loading={false} tableData={withdraws} columns={columms} />
            <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', gap: 2, marginTop: 4 }}>
                <Typography variant='body'>Suma sprzedaży: {toCurrency(sumOfSales)} </Typography>
                <Typography variant='body'>Do wypłaty: {toCurrency(getWithdrawAmount(sumOfSales, withdraws))} </Typography>
                <Button onClick={handleOpenNewWithdrawModal}
                    sx={{ marginTop: 3 }} color='inherit' variant='contained'>Dodaj wypłatę</Button>
            </Box>
        </div>
    )
}

export default ClientSummaryScreen