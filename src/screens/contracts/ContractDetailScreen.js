import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from '../../components/DataTable'
import { Box, Button, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import { setItemModal, setReturnModal } from '../../redux/modalSlice';
import { toCurrency, decToHex } from '../../utils/misc-utils';
import { useNavigate, useParams } from 'react-router-dom';
import { ContractContext } from '../../context/contract-context';
import { fullDateToString } from '../../utils/date-utils';
import { setPath } from '../../redux/screenSlice';


// Contract detail screen
const ContractDetailScreen = () => {
    // Redux
    // const { detailedContractData: items } = useSelector(state => state.database)
    const { loading } = useSelector(state => state.screen)

    const [items, setItems] = useState();
    const [contract, setContract] = useState({});
    const [client, setClient] = useState();

    const { id } = useParams();
    const { setCurrentContractID, allContracts } = useContext(ContractContext);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentContractID(id);
        // Pobierz umowę
        window.api.getContract(id).then(res => {
            const contract = res[0]
            setContract(contract)
            dispatch(setPath(`Umowy\\${contract.numer_umowy}`))

            // Pobierz klienta
            window.api.getClient(contract.id_klienta).then(res => {
                setClient(res[0]);
            })
        })

        // Pobierz przedmioty
        window.api.getItemsWithContracts(id).then(res => {
            // setContract(res);
            setItems(res);
        })


        return () => {
            setCurrentContractID(null);
        }
    }, [dispatch, id, allContracts, setCurrentContractID]);

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
                Header: 'Zwrot towaru',
                accessor: 'zwroconaIlosc',
            },
            {
                Header: 'Ilość w komisie',
                Cell: props => <div>{props.row.original.przyjetaIlosc - props.row.original.sprzedanaIlosc - props.row.original.zwroconaIlosc}</div>
            },
            {
                Header: 'Kwota dla komitenta (sztuka)',
                accessor: 'kwotaDlaKomitenta',
                Cell: props => <div> {toCurrency(props.value)} </div>
            },
            {
                Header: 'Kwota dla komitenta (całość)',
                Cell: props => <div> {toCurrency(props.row.original.kwotaDlaKomitenta * props.row.original.przyjetaIlosc)} </div>
            },
            {
                Header: 'Domyślna prowizja',
                accessor: 'domyslnaMarza',
                Cell: props => <div> {toCurrency(props.value)} </div>
            },
            {
                Header: 'Domyślna cena',
                Cell: props => <div> {toCurrency(props.row.original.kwotaDlaKomitenta + props.row.original.domyslnaMarza)} </div>
            },
            {
                Header: 'Do wypłaty',
                Cell: props => <div> {toCurrency(props.row.original.kwotaDlaKomitenta * props.row.original.sprzedanaIlosc)} </div>
            },
            {
                Header: 'Edytuj',
                Cell: props => <IconButton onClick={() => dispatch(setItemModal({
                        isOpen: true,
                        edit: true,
                        item: props.row.original,
                        contract: contract
                    }))}>
                    <EditIcon />
                </IconButton>
            },
            {
                Header: 'Zwróć',
                Cell: props => <IconButton onClick={() => dispatch(setReturnModal({
                    isOpen: true,
                    edit: false,
                    item: props.row.original
                }))
                }>
                    <AssignmentReturnIcon />
                </IconButton>

            },
        ],
        [dispatch, contract]
    )

    if (!contract || !items || !client) return null

    const openPrintView = () => {
        navigate('print')
    }

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 6 }}>
                <Box>
                    <Typography align='justify' variant="body1" fontSize={21}>
                        Umowa nr. {contract.numer_umowy} - {client.skrot}
                    </Typography>
                    <Typography align='justify' variant="body2" fontSize={21}>
                    </Typography>
                </Box>
                <Typography align='justify' variant="body2" fontSize={21}>
                    {client.imie} {client.nazwisko}, {fullDateToString(contract.data)}

                </Typography>
                {/* <Typography sx={{ mb: 1 }}>{contract.data}</Typography> */}
            </Box>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'end', gap: 1 }}>
                <Button
                    onClick={() => dispatch(setItemModal({
                        isOpen: true,
                        edit: false,
                        contract: contract
                    }))} variant="contained" color="secondary" style={{ marginTop: 20 }}>
                    Przyjmij towar
                </Button>
                <Button
                    onClick={openPrintView} variant="contained" color="inherit" style={{ marginTop: 20 }}>
                    Drukuj
                </Button>
                <Button
                    onClick={() => console.log(contract)} variant="contained" color="inherit" style={{ marginTop: 20 }}>
                    Drukuj metki
                </Button>
            </Box>

            <DataTable loading={loading} tableData={items} columns={columns} enumerate={true}/>
        </div>
    )
}

export default ContractDetailScreen