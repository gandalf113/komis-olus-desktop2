import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { DataTable } from '../components/DataTable'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { getClientsData } from '../redux/databaseSlice'
import { toggleNewClientModal } from '../redux/modalSlice';
import { setNavbarTitle } from '../redux/screenSlice';

const ClientsScreen = () => {
    const dispatch = useDispatch()

    const { clientsData, loading } = useSelector(state => state.database)

    useEffect(() => {
        dispatch(setNavbarTitle('klienci'))
        dispatch(getClientsData())
    }, [dispatch])

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id_klienta', // accessor is the "key" in the data
            },
            {
                Header: 'Skrót',
                accessor: 'skrot',
            },
            {
                Header: 'Imię',
                accessor: 'imie',
            },
            {
                Header: 'Nazwisko',
                accessor: 'nazwisko',
            },
        ],
        []
    )
    return (
        <div>
            {/* <Button variant="contained" color="success" style={{ marginBottom: 10 }}
                onClick={() => dispatch(toggleNewClientModal(true))}>Nowy klient</Button> */}
            <DataTable loading={loading} tableData={clientsData} columns={columns} />
        </div>
    )
}

export default ClientsScreen