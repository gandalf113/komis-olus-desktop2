import React from 'react'
import { DataTable } from '../components/DataTable'

const SalesScreen = () => {
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
            <button>Nowa sprzedaż</button>
            <DataTable apiCallback={window.api.getSalesWithItems} columns={columns} />
        </div>
    )
}

export default SalesScreen