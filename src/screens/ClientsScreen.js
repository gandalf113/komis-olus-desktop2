import React, { useMemo } from 'react'
import { DataTable } from '../components/DataTable'

const ClientsScreen = () => {

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id', // accessor is the "key" in the data
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
            ClientsScreen
            <DataTable apiCallback={window.api.getClients} columns={columns} />
        </div>
    )
}

export default ClientsScreen