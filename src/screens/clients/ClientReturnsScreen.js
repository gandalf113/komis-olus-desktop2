import { Typography, IconButton } from '@mui/material';
import React, { useContext, useEffect, useMemo } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { DataTable } from '../../components/DataTable';
import { ReturnsContext } from '../../context/return-context'
import { decToHex } from '../../utils/misc-utils';
import PrintIcon from '@mui/icons-material/Print';

/**
 * Wyświetl zwroty dla danego klienta
 * @param {Array} allReturns - lista wszystkich zwrotów
 * @param {Number} clientId - id klienta
 */
const filterReturns = (allReturns, clientId) => {
    clientId = Number.parseInt(clientId)
    return allReturns.filter(r => r.id_klienta === clientId);
}

const ClientReturnsScreen = () => {
    const { allReturns, reloadReturns } = useContext(ReturnsContext);

    const { id: clientId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        reloadReturns();
    }, []);

    const openPrintView = (returnId) => navigate(`/returns/${returnId}/print`);

    const columns = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id_zwrotu',
            },
            {
                Header: 'Kod z metki',
                accessor: 'id_przedmiotu',
                Cell: props => <Typography>{decToHex(props.value)}</Typography>
            },
            {
                Header: 'Nazwa przedmiotu',
                accessor: 'nazwa',
            },
            {
                Header: 'Kontrahent',
                accessor: 'skrot',
            },
            {
                Header: 'Zwrócona ilość',
                accessor: 'ilosc',
            },
            {
                Header: 'Data zwrotu',
                accessor: 'data',
            },
            {
                Header: 'Drukuj',
                Cell: props => <IconButton onClick={() => openPrintView(props.row.original.id_zwrotu)}>
                    <PrintIcon/>
                </IconButton>
            },
        ],
        []
    )

    const filteredReturns = filterReturns(allReturns, clientId)

    return (
        <div>
            <DataTable loading={false} tableData={filteredReturns} columns={columns} />
        </div>
    )
}

export default ClientReturnsScreen