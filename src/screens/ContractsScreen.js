import React from 'react'
import { DataTable } from '../components/DataTable'

const ContractsScreen = ({ openContractCallback }) => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Id',
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
                Header: 'Otwórz',
                Cell: props => <button onClick={() => openContractCallback(props.row.original)}>Otwórz umowę</button>
            },
        ],
        [openContractCallback]
    )
    return (
        <div>
            <button>Nowa umowa</button>
            <DataTable apiCallback={window.api.getContractsWithClients} columns={columns} />
        </div>
    )
}

export default ContractsScreen