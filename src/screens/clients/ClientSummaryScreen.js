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
import SavingsSharpIcon from '@mui/icons-material/SavingsSharp';
import { openNotification } from '../../redux/notificationSlice';
import AddButton from '../../components/AddButton';


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
            <AddButton
                icon={<SavingsSharpIcon />}
                text="Dodaj wypłatę"
                onClick={handleOpenNewWithdrawModal}
            />

            <DataTable loading={false} tableData={withdraws} columns={columms} hideSearchBar />

            <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 3 }}>
                <Typography variant='body'>Suma sprzedaży: {toCurrency(sumOfSales)} </Typography>
                <Typography variant='body'>Do wypłaty: {toCurrency(getWithdrawAmount(sumOfSales, withdraws))} </Typography>
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