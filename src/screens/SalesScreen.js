import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from '../components/DataTable'
import { getSalesData } from '../redux/databaseSlice';
import { toggleNewSaleModal } from '../redux/modalSlice';

const SalesScreen = () => {
    const dispatch = useDispatch()

    const { salesData } = useSelector(state => state.database)

    useEffect(() => {
        dispatch(getSalesData())
    }, [dispatch])

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
            <DataTable tableData={salesData} columns={columns} />
        </div>
    )
}

export default SalesScreen