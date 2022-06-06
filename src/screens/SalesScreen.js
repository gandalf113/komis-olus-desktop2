import { Button } from '@mui/material';
import React from 'react'
import { useDispatch } from 'react-redux';
import { DataTable } from '../components/DataTable'
import { toggleNewSaleModal } from '../redux/modalSlice';

const SalesScreen = () => {
    const dispatch = useDispatch()

    function openModal() {
        dispatch(toggleNewSaleModal(true))
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'id',
                accessor: 'id_sprzedazy',
            },
            {
                Header: 'Przedmiot',
                accessor: 'nazwa',

            },
            {
                Header: 'Data sprzedaży',
                accessor: 'data',
            },
        ],
        []
    )

    return (
        <div>
            <Button onClick={openModal} variant="contained" color="success" style={{ marginBottom: 10 }}>Nowa sprzedaż</Button>
            <DataTable apiCallback={window.api.getSalesWithItems} columns={columns} />
        </div>
    )
}

export default SalesScreen