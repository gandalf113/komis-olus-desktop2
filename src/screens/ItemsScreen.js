import React from 'react'
import { DataTable } from '../components/DataTable'
import { Button } from '@mui/material';

const ItemsScreen = ({ contract }) => {
    const decToHex = (dec) => {
        let hexStr = dec.toString(16);
        return hexStr
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID przedmiotu',
                accessor: 'id_przedmiotu',
                Cell: props => <div>{decToHex(props.value)}</div>
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
            <h1>{contract.skrot} {contract.id_umowy} </h1>
            <h3>Data zawarcia: {contract.data}</h3>
            <DataTable apiCallback={window.api.getItemsWithContracts} columns={columns} apiArgs={contract.id_umowy} />
            <Button onClick={() => console.log(contract)} variant="contained" color="secondary" style={{ marginTop: 20 }}>Drukuj PDF</Button>
        </div>
    )
}

export default ItemsScreen