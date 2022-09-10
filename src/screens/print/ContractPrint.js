import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from '../../components/DataTable'
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ContractContext } from '../../context/contract-context';
import { toCurrency, decToHex } from '../../utils/miscUtils';
import { fullDateToString } from '../../utils/date-utils';
import { setPath } from '../../redux/screenSlice';
import PrintTemplate from './PrintTemplate';

const ContractPrint = () => {
    const { loading } = useSelector(state => state.screen)

    const [items, setItems] = useState();
    const [contract, setContract] = useState({});
    const [client, setClient] = useState();

    const { id } = useParams();
    const { setCurrentContractID, allContracts } = useContext(ContractContext);

    const dispatch = useDispatch();

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
            setItems(res);
        })


        return () => {
            setCurrentContractID(null);
        }
    }, [id, allContracts, dispatch, setCurrentContractID]);

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
                Header: 'Kwota dla komitenta (sztuka)',
                accessor: 'kwotaDlaKomitenta',
                Cell: props => <div> {toCurrency(props.value)} </div>
            },
            {
                Header: 'Kwota dla komitenta (całość)',
                Cell: props => <div> {toCurrency(props.row.original.kwotaDlaKomitenta * props.row.original.przyjetaIlosc)} </div>
            },
        ],
        []
    )

    if (!contract || !items || !client) return null

    return (
        <PrintTemplate date={contract.data}>

            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '80vh', paddingTop: 1 }}>
                <Box>
                    <Box sx={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                        <Typography variant="body1" fontSize={21}>
                            Umowa nr. {contract.numer_umowy}
                        </Typography>
                        <Box>
                            <Typography variant="body2" fontSize={21}>
                                {client.imie} {client.nazwisko} ({client.skrot})
                            </Typography>
                            <Typography>
                                {client.adres}
                            </Typography>
                        </Box>
                    </Box>
                </Box>


                <DataTable loading={loading} tableData={items} apiCallback={window.api.getItemsWithContracts}
                    columns={columns} apiArgs={contract.id_umowy} hideSearchBar shrinkRows />

                <Box sx={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'end', gap: 6, flexGrow: 1
                }}>
                    <Box>
                        <Typography variant='body1' sx={{ marginBottom: 3 }}>Podpis pracownika: </Typography>
                        <Typography variant='body2'>{"...".repeat(20)}</Typography>
                    </Box>

                    <Box>
                        <Typography variant='body1' sx={{ marginBottom: 3 }}>Podpis komitenta: </Typography>
                        <Typography variant='body2'>{"...".repeat(20)}</Typography>
                    </Box>
                </Box>
            </Box>
        </PrintTemplate>

    )
}

export default ContractPrint