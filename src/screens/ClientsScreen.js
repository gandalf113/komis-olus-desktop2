import React from 'react'
import { DataTable } from '../components/DataTable'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { openNotification } from '../redux/notificationSlice'

const ClientsScreen = () => {
    const dispatch = useDispatch()

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
            <Button variant="contained" color="success" style={{ marginBottom: 10 }}
                onClick={() => dispatch(openNotification('Dodano klienta'))}>Nowy klient</Button>
            <DataTable apiCallback={window.api.getClients} columns={columns} />
        </div>
    )
}

export default ClientsScreen