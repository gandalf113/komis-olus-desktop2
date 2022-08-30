import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Typography, Box } from '@mui/material'
import { DataTable } from '../components/DataTable';

const ClientDetailScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [contracts, setContracts] = useState();
    const [client, setClient] = useState();

    useEffect(() => {
        window.api.getClient(id).then(res => {
            setClient(res[0]);
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
        []
    )

    if (!contracts || !client) return null

    return (
        <div>
            <Box style={{ alignItems: 'center', marginBottom: 12 }}>
                <Typography variant='h5'>{client.imie} {client.nazwisko} - {client.skrot}</Typography>
                <Typography variant='body1'></Typography>

            </Box>

            <DataTable loading={false} tableData={contracts} columns={columns} />
        </div>
    )
}

export default ClientDetailScreen