import React, { useEffect, useState, useMemo, useCallback, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Typography, Box, Button, Tabs, Tab } from '@mui/material'
import { DataTable } from '../components/DataTable';
import { ClientContext } from '../context/client-context';
import TabPanel from '../components/TabPanel';
import ClientSummaryScreen from './ClientSummaryScreen';
import { useDispatch } from 'react-redux';
import { setPath } from '../redux/screenSlice';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const ClientDetailScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [contracts, setContracts] = useState();
    const [client, setClient] = useState();

    const [tabIndex, setTabIndex] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const { setCurrentlyEditetClient } = useContext(ClientContext);

    useEffect(() => {
        window.api.getClient(id).then(res => {
            const client = res[0];
            dispatch(setPath(`Klienci\\${client.skrot}`));
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
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabIndex} onChange={handleTabChange} aria-label="basic tabs example">
                    <Tab label="Umowy" {...a11yProps(0)} />
                    <Tab label="Wypłaty" {...a11yProps(1)} />
                </Tabs>
            </Box>
            {/* Client's contracts */}
            <TabPanel value={tabIndex} index={0}>
                <Box style={{ alignItems: 'center' }}>
                </Box>

                <DataTable loading={false} tableData={contracts} columns={columns} />
            </TabPanel>

            {/* Client's withdraws */}
            <TabPanel value={tabIndex} index={1}>
                <ClientSummaryScreen/>
            </TabPanel>
        </Box>
    )
}

export default ClientDetailScreen