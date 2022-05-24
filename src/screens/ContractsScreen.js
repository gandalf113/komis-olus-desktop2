import React, { useMemo } from 'react'
import { DataTable } from '../components/DataTable'

const ContractsScreen = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'id',
                accessor: 'id',
            },
            {
                Header: 'idKomitenta',
                accessor: 'idKomitenta',
            },
            {
                Header: 'Data zawarcia umowy',
                accessor: 'data',
            },
        ],
        []
    )
    return (
        <div>
            ContractsScreen
            <DataTable apiCallback={window.api.getContracts} columns={columns} />
        </div>
    )
}

export default ContractsScreen