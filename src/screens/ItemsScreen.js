import React from 'react'
import { DataTable } from '../components/DataTable'

const ItemsScreen = ({ contract }) => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'ID Przedmiotu',
                accessor: 'id_przedmiotu',
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
        []
    )
    return (
        <div>
            <h2>Umowa z dnia xx-xx-xxxx zawarta z komitentem xxxxn</h2>
            <DataTable apiCallback={window.api.getItemsWithContracts} columns={columns} apiArgs={contract} />
        </div>
    )
}

export default ItemsScreen