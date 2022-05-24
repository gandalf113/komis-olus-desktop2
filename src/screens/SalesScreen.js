import React, { useMemo } from 'react'
import { DataTable } from '../components/DataTable'

const SalesScreen = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'id',
                accessor: 'id',
            },
            {
                Header: 'Przedmiot',
                accessor: 'idPrzedmiotu',
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
            SalesScreen
            <DataTable apiCallback={window.api.getSales} columns={columns} />
        </div>
    )
}

export default SalesScreen