import React from 'react'
import { DataTable } from '../components/DataTable'

const ItemsScreen = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Id',
                accessor: 'id_przedmiotu',
            },
            {
                Header: 'ID Umowy',
                accessor: 'id_umowy',
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
            <DataTable apiCallback={window.api.getItemsWithContracts} columns={columns} apiArgs={3} />
        </div>
    )
}

export default ItemsScreen