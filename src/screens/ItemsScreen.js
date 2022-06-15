import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from '../components/DataTable'
import { Button } from '@mui/material';
import { getContractDetail } from '../redux/databaseSlice';

// Contract detail screen
const ItemsScreen = ({ contract }) => {
    // Redux
    const { detailedContractData } = useSelector(state => state.database)

    const dispatch = useDispatch()

    const decToHex = (dec) => {
        let hexStr = dec.toString(16);
        return hexStr
    }

    useEffect(() => {
        dispatch(getContractDetail(contract.id_umowy))
    }, [dispatch, contract.id_umowy])

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
        []
    )
    return (
        <div>
            <h1>{contract.skrot} {contract.id_umowy} </h1>
            <h3>Data zawarcia: {contract.data}</h3>
            <DataTable tableData={detailedContractData} apiCallback={window.api.getItemsWithContracts} columns={columns} apiArgs={contract.id_umowy} />
            <Button onClick={() => console.log(contract)} variant="contained" color="secondary" style={{ marginTop: 20 }}>Drukuj PDF</Button>
        </div>
    )
}

export default ItemsScreen