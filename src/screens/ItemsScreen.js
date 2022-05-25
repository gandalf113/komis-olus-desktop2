import React from 'react'
import { DataTable } from '../components/DataTable'

const ItemsScreen = ({ contract }) => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'ID przedmiotu',
                accessor: 'id_przedmiotu',
                Cell: props => <div>{contract.skrot} {contract.id_umowy} {props.value}</div>

            },
            {
                Header: 'Nazwa',
                accessor: 'nazwa',
            },
            {
                Header: 'Przyjęta ilość',
                accessor: 'przyjetaIlosc',
            },
            {
                Header: 'Sprzedana ilość',
                accessor: 'sprzedanaIlosc',
            },
            {
                Header: 'Ilość w komisie',
                Cell: props => <div>{props.row.original.przyjetaIlosc - props.row.original.sprzedanaIlosc}</div>
            },
        ],
        [contract.skrot, contract.id_umowy]
    )
    return (
        <div>
            <button onClick={() => console.log(contract)}>Drukuj PDF</button>
            <h1>{contract.skrot} {contract.id_umowy} </h1>
            <h3>Data zawarcia: {contract.data}</h3>
            <DataTable apiCallback={window.api.getItemsWithContracts} columns={columns} apiArgs={contract.id_umowy} />
        </div>
    )
}

export default ItemsScreen