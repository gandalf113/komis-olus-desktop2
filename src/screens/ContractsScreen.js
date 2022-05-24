import React from 'react'
import { DataTable } from '../components/DataTable'

const ContractsScreen = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'id',
                accessor: 'id_umowy',
            },
            {
                Header: 'Komitent',
                accessor: 'skrot',
            },
            {
                Header: 'Data zawarcia umowy',
                accessor: 'data',
            },
            {
                Header: 'Przedmioty',
                Cell: props => <button onClick={() => alert(props.row.original.id_umowy)}>Pokaż</button>
            },
        ],
        []
    )
    return (
        <div>
            <button>Nowa umowa</button>
            <DataTable apiCallback={window.api.getContractsWithClients} columns={columns} />
        </div>
    )
}

export default ContractsScreen