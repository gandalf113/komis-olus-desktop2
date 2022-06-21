import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from '../components/DataTable'
import { Box, Button, Typography } from '@mui/material';
import { getContractDetail } from '../redux/databaseSlice';
import { toggleNewItemModal } from '../redux/modalSlice';

// Contract detail screen
const ContractDetailScreen = () => {
    // Redux
    const { detailedContractData: items } = useSelector(state => state.database)
    const { currentContract: contract } = useSelector(state => state.screen)

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
            <Box sx={{ display: 'flex', alignItems: 'end', gap: 2 }}>
                <Typography align='justify' variant="h4">
                    {contract.skrot} {contract.id_umowy}
                </Typography>
                {/* <Typography sx={{ mb: 1 }}>{contract.data}</Typography> */}
            </Box>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'end', gap: 1 }}>
                <Button
                    onClick={() => dispatch(toggleNewItemModal(true))} variant="contained" color="secondary" style={{ marginTop: 20 }}>
                    Przyjmij towar
                </Button>
                <Button
                    onClick={() => console.log(contract)} variant="contained" color="inherit" style={{ marginTop: 20 }}>
                    Drukuj PDF
                </Button>
                <Button
                    onClick={() => console.log(contract)} variant="contained" color="inherit" style={{ marginTop: 20 }}>
                    Generuj metki
                </Button>
            </Box>

            <DataTable tableData={items} apiCallback={window.api.getItemsWithContracts} columns={columns} apiArgs={contract.id_umowy} />
        </div>
    )
}

export default ContractDetailScreen