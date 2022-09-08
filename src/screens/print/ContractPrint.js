import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from '../../components/DataTable'
import { Box, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import { toggleEditItemModal, toggleNewItemModal, toggleNewReturnModal } from '../../redux/modalSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { ContractContext } from '../../context/contract-context';
import { toCurrency, decToHex } from '../../utils/miscUtils';
import { fullDateToString } from '../../utils/date-utils';
import { setPath } from '../../redux/screenSlice';

const ContractPrint = () => {
    const { loading } = useSelector(state => state.screen)

    const [items, setItems] = useState();
    const [contract, setContract] = useState({});
    const [client, setClient] = useState();

    const { id } = useParams();
    const { setCurrentContractID, allContracts, setCurrentlyEditetItem } = useContext(ContractContext);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentContractID(id);
        // Pobierz umowę
        window.api.getContract(id).then(res => {
            const contract = res[0]
            setContract(contract)
            dispatch(setPath(`Umowy\\${contract.numer_umowy}\\Podgląd wydruku`))

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
                Header: 'Domyślna marża',
                accessor: 'domyslnaMarza',
                Cell: props => <div> {toCurrency(props.value)} </div>
            },
            {
                Header: 'Do wypłaty',
                Cell: props => <div> {toCurrency(props.row.original.kwotaDlaKomitenta * props.row.original.sprzedanaIlosc)} </div>
            },
        ],
        [dispatch, setCurrentlyEditetItem]
    )

    if (!contract || !items || !client) return null

    const handlePrint = () => {
        window.printer.print(`umowa_${contract.numer_umowy}_${client.skrot}_${contract.data}`)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '80vh' }}>
            <Box>
                {/* <Button onClick={handlePrint}
                    variant='contained' color='inherit' sx={{ marginBottom: 4 }}>Drukuj</Button> */}
                <Box sx={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'end', gap: 6, marginBottom: 5
                }}>
                    <Typography align='justify' variant="body1" fontSize={21}>
                        Umowa nr. {contract.numer_umowy}
                    </Typography>
                    <Typography align='justify' variant="body2" fontSize={21}>
                        {client.imie} {client.nazwisko} ({client.skrot})
                    </Typography>
                </Box>
            </Box>


            <DataTable loading={loading} tableData={items} apiCallback={window.api.getItemsWithContracts}
                columns={columns} apiArgs={contract.id_umowy} hideSearchBar />

            <Box sx={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'end', gap: 6, flexGrow: 1
            }}>
                <Typography align='justify' variant="body1" fontSize={21}>
                    {fullDateToString(contract.data)}
                </Typography>

                <Box>
                    <Typography variant='body1' sx={{ marginBottom: 3 }}>Podpis: </Typography>
                    <Typography variant='body2'>____________________________________</Typography>
                </Box>
            </Box>


        </Box>
    )
}

export default ContractPrint