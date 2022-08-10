import React, { useContext, useEffect } from 'react'
import { DataTable } from '../components/DataTable'
import { useDispatch } from 'react-redux'
import { setNavbarTitle } from '../redux/screenSlice';
import { ClientContext } from '../context/client-context';

const ClientsScreen = () => {
    const dispatch = useDispatch()

    const { allClients: clients, reloadClients } = useContext(ClientContext);

    useEffect(() => {
        dispatch(setNavbarTitle('klienci'))
        reloadClients();
    }, [dispatch])

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id_klienta', // accessor is the "key" in the data
            },
            {
                Header: 'Skrót',
                accessor: 'skrot',
            },
            {
                Header: 'Imię',
                accessor: 'imie',
            },
            {
                Header: 'Nazwisko',
                accessor: 'nazwisko',
            },
        ],
        []
    )
    return (
        <div>
            {/* <Button variant="contained" color="success" style={{ marginBottom: 10 }}
                onClick={() => dispatch(toggleNewClientModal(true))}>Nowy klient</Button> */}
            <DataTable loading={false} tableData={clients} columns={columns} />
        </div>
    )
}

export default ClientsScreen