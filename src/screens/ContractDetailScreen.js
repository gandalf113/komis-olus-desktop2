import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from '../components/DataTable'
import { Box, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { getContractDetail } from '../redux/databaseSlice';
import { toggleNewItemModal } from '../redux/modalSlice';
import { toCurrency, decToHex } from '../utils/miscUtils';
import { setNavbarTitle } from '../redux/screenSlice';
import { useParams } from 'react-router-dom';
import { ContractContext } from '../context/contract-context';


// Contract detail screen
const ContractDetailScreen = () => {
    // Redux
    // const { detailedContractData: items } = useSelector(state => state.database)
    const { loading } = useSelector(state => state.screen)

    const [items, setItems] = useState();
    const [contract, setContract] = useState({});

    const { id } = useParams()
    const { setCurrentContractID, allContracts } = useContext(ContractContext);

    const dispatch = useDispatch()

    useEffect(() => {
        setCurrentContractID(id);
        // Pobierz umowę
        window.api.getContract(id).then(res => {
            // setContract(res)
            setContract(res[0])
        })

        // Pobierz przedmioty
        window.api.getItemsWithContracts(id).then(res => {
            // setContract(res)
            setItems(res)
        })

        return () => {
            setCurrentContractID(null);
        }
    }, [dispatch, id, allContracts])

    const columns = React.useMemo(
        () => [
            {
                Header: 'Kod z metki',
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
            {
                Header: 'Kwota dla komitenta',
                accessor: 'kwotaDlaKomitenta',
                Cell: props => <div> {toCurrency(props.value)} </div>
            },
            {
                Header: 'Marża',
                accessor: 'marza',
                Cell: props => <div> {toCurrency(props.value)} </div>
            },
            {
                Header: 'Cena',
                accessor: 'cena',
                Cell: props => <div> {toCurrency(props.value)} </div>
            },
            {
                Header: 'Do wypłaty',
                Cell: props => <div> {toCurrency(props.row.original.kwotaDlaKomitenta * props.row.original.sprzedanaIlosc)} </div>
            },
            {
                Header: 'Edytuj',
                Cell: props => <EditIcon sx={{ cursor: 'pointer' }} />
            },
        ],
        []
    )

    if (!contract || !items) return null

    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'end', gap: 2 }}>
                <Typography align='justify' variant="h4">
                    {contract.id_umowy}. {contract.data}
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
                    Drukuj metki
                </Button>
            </Box>

            <DataTable loading={loading} tableData={items} apiCallback={window.api.getItemsWithContracts}
                columns={columns} apiArgs={contract.id_umowy} />
        </div>
    )
}

export default ContractDetailScreen