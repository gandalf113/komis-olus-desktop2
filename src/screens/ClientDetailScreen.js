import React, { useEffect, useState, useMemo, useCallback, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Typography, Box, Button } from '@mui/material'
import { DataTable } from '../components/DataTable';
import { ClientContext } from '../context/client-context';

const ClientDetailScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [contracts, setContracts] = useState();
    const [client, setClient] = useState();

    const { setCurrentlyEditetClient } = useContext(ClientContext);

    useEffect(() => {
        window.api.getClient(id).then(res => {
            const client = res[0];
            setCurrentlyEditetClient(client);
            setClient(client);
        });

        window.api.getClientsContracts(id).then(res => {
            setContracts(res);
        });
    }, [])

    const openContract = useCallback(
        (contract) => {
            navigate(`/contracts/${contract.id_umowy}`)
        },
        [navigate],
    )

    const columns = useMemo(
        () => [
            {
                Header: 'Id',
                accessor: 'id_umowy',
            },
            {
                Header: 'Numer umowy',
                accessor: 'numer_umowy',
            },
            {
                Header: 'Data zawarcia umowy',
                accessor: 'data',
            },
            {
                Header: 'Otwórz',
                Cell: props => <Typography sx={{ cursor: 'pointer' }}
                    onClick={() => openContract(props.row.original)}
                    color="secondary">Otwórz umowę</Typography>

            },
        ],
        [openContract]
    )

    if (!contracts || !client) return null

    const handleOpenSummary = () => {
        navigate(`summary`);
    }

    return (
        <div>
            <Box style={{ alignItems: 'center', marginBottom: 12 }}>
                <Typography variant='h5'>{client.imie} {client.nazwisko} - {client.skrot}</Typography>
                <Button onClick={handleOpenSummary}
                    style={{ marginTop: 10, marginBottom: 10 }} color='secondary' variant='contained'>Otwórz wypłaty</Button>
            </Box>

            <DataTable loading={false} tableData={contracts} columns={columns} />
        </div>
    )
}

export default ClientDetailScreen