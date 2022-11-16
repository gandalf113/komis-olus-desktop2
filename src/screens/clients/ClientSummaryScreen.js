import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { SalesContext } from '../../context/sales-context';
import { toCurrency } from '../../utils/misc-utils';
import { useDispatch } from 'react-redux';
import { setWithdrawModal } from '../../redux/modalSlice';
import { DataTable } from '../../components/DataTable';
import { WithdrawContext } from '../../context/withdraw-context';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmModal from '../../components/modals/ConfirmModal';
import { openNotification } from '../../redux/notificationSlice';


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

    const dispatch = useDispatch();

    const [client, setClient] = useState();
    const [items, setItems] = useState();
    const [withdraws, setWithdraws] = useState();

    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        withdraw: null
    });

    const { allSales } = useContext(SalesContext);
    const { allWithdraws, reloadWithdraws } = useContext(WithdrawContext);

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

    const deleteWithdraw = () => {
        const withdraw = deleteModal.withdraw;

        if (!withdraw) return;

        window.api.deleteWithdraw(withdraw.id_wyplaty)
            .then(res => {
                reloadWithdraws();
                setDeleteModal({
                    isOpen: false,
                    withdraw: null
                })
                dispatch(openNotification(`Pomyślnie wycofano wypłatę o wartości ${withdraw.kwota} zł`));
            })
            .catch(err => {
                alert("Nie udało się wycofać wypłaty. Informacje o błędzie w konsoli")
                console.error(err);
            });
    }

    const columms = useMemo(
        () => [
            {
                Header: 'ID',
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
            {
                Header: 'Usuń',
                Cell: props => <IconButton onClick={() => setDeleteModal({ isOpen: true, withdraw: props.row.original })} >
                    <DeleteIcon />
                </IconButton>
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
        <>
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

            <ConfirmModal
                handleClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
                isOpen={deleteModal.isOpen}
                title={deleteModal.withdraw ? `Czy na pewno chcesz wycofać wypłatę ${deleteModal.withdraw.kwota} zł dla ${client.skrot}?`
                    : 'Czy na pewno chcesz wycofać wypłatę?'}
                handleYes={deleteWithdraw}
            />
        </>
    )
}

export default ClientSummaryScreen